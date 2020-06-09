import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserRole } from "@funk/model/auth/user-role"
import { Auth } from "@funk/model/identity/auth"
import { UserSession as IUserSession } from "@funk/model/identity/user-session"
import { Person, PERSONS } from "@funk/model/identity/person"
import { AuthClient } from "@funk/plugins/auth/auth-client"
import { of } from "rxjs"
import { switchMap, shareReplay, map } from "rxjs/operators"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>
)
{
  return auth.user.pipe(
    ignoreNullish(),
    switchMap(async (user) => ({
      id: user.uid,
      token: await user.getIdToken(),
      claims: {
        role: user.isAnonymous
          ? UserRole.ANONYMOUS
          : (await user.getIdTokenResult()).claims.role,
      },
    }) as Auth),
    switchMap((_auth) =>
    {
      if (_auth.claims.role === UserRole.ANONYMOUS)
      {
        return of<IUserSession>({
          auth: _auth,
          person: {
            id: _auth.id,
            displayName: "Guest",
          },
        })
      }
      return listenById<Person>(PERSONS, _auth.id)
        .pipe(
          map((person) => ({
            auth: _auth,
            person: person!,
          }))
        )
    }),
    shareReplay(1)
  )
}

export type UserSession = ReturnType<typeof construct>
