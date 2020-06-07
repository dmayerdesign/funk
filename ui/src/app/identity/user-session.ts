import { AngularFireAuth } from "@angular/fire/auth"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { distinctUntilKeyChanged, switchMap, shareReplay, map } from "rxjs/operators"
import { UserRole } from "@funk/model/auth/user-role"
import { Auth } from "@funk/model/identity/auth"
import { of } from "rxjs"
import { UserSession as IUserSession } from "@funk/model/identity/user-session"
import { Person, PERSONS } from "@funk/model/identity/person"

export function construct(
  auth: AngularFireAuth,
  listenById: ReturnType<typeof constructListenById>
)
{
  return auth.user.pipe(
    ignoreNullish(),
    distinctUntilKeyChanged("uid"),
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
