import { AngularFireAuth } from "@angular/fire/auth"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { distinctUntilKeyChanged, switchMap, shareReplay } from "rxjs/operators"
import { of, Observable } from "rxjs"
import { User } from "firebase"
import { UserState as IUserState, USER_STATES } from "@funk/model/identity/user-state"

export function construct(
  auth: AngularFireAuth,
  listenById: ReturnType<typeof constructListenById>
)
{
  return auth.user.pipe(
    ignoreNullish(),
    distinctUntilKeyChanged("uid"),
    switchMap<User, Observable<IUserState | undefined>>((user) =>
    {
      if (user.isAnonymous) return of({ id: user.uid })
      return listenById<IUserState>(USER_STATES, user.uid)
    }),
    shareReplay(1)
  )
}

export type UserState = ReturnType<typeof construct>
