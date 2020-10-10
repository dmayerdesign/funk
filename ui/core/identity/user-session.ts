import { construct as constructListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserRole } from "@funk/model/auth/user-role"
import { Auth } from "@funk/model/identity/auth"
import { UserSession as IUserSession } from "@funk/model/identity/user-session"
import { Person, PERSONS } from "@funk/model/identity/person"
import getVerifiedRole from "@funk/model/auth/behaviors/get-verified-role"
import { AuthClient } from "@funk/ui/plugins/auth/auth-client"
import { of } from "rxjs"
import { switchMap, shareReplay, map } from "rxjs/operators"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>
) {
  return auth.user.pipe(
    ignoreNullish(),
    switchMap(async (user) => {
      const unverifiedClaims = {
        role: user.isAnonymous
          ? UserRole.ANONYMOUS
          : (await user.getIdTokenResult()).claims.role,
      }
      const verifiedClaims = {
        ...unverifiedClaims,
        role: getVerifiedRole(
          { emailVerified: user.emailVerified },
          unverifiedClaims
        ),
      }
      return {
        id: user.uid,
        token: await user.getIdToken(),
        claims: verifiedClaims,
      } as Auth
    }),
    switchMap((_auth) => {
      if (_auth.claims.role === UserRole.ANONYMOUS) {
        return of<IUserSession>({
          auth: _auth,
          person: {
            id: _auth.id,
            displayName: "Guest",
          },
        })
      }
      return listenById<Person>(PERSONS, _auth.id).pipe(
        map((person) => ({
          auth: _auth,
          person: person!,
        }))
      )
    }),
    // tapAndLog("user session"),
    shareReplay(1)
  )
}

export type UserSession = ReturnType<typeof construct>
