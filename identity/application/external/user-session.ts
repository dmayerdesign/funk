import getVerifiedRole from "@funk/auth/domain/behaviors/get-verified-role"
import { UserRole } from "@funk/auth/domain/user-role"
import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { Auth } from "@funk/identity/domain/auth"
import { Person, PERSONS } from "@funk/identity/domain/person"
import { UserSession as IUserSession } from "@funk/identity/domain/user-session"
import { construct as constructListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { of } from "rxjs"
import { map, shareReplay, switchMap } from "rxjs/operators"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>,
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
          unverifiedClaims,
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
        })),
      )
    }),
    shareReplay(1),
  )
}

export type UserSession = ReturnType<typeof construct>
