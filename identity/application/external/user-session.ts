import getVerifiedRole from "@funk/auth/model/behaviors/get-verified-role"
import { UserRole } from "@funk/auth/model/user-role"
import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { Auth } from "@funk/identity/model/auth"
import { UserSession as IUserSession } from "@funk/identity/model/user-session"
import { ListenById as ListenForPersonById } from "@funk/identity/person/application/external/behaviors/persistence/listen-by-id"
import { of } from "rxjs"
import { map, shareReplay, switchMap } from "rxjs/operators"

export function construct(
  auth: AuthClient,
  listenForPersonById: ListenForPersonById,
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
      return listenForPersonById(_auth.id).pipe(
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
