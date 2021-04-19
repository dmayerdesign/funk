import {
  AuthClient,
  AuthClientUser,
} from "@funk/auth/plugins/external/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserState } from "@funk/identity/model/user-state"
import { ListenById } from "@funk/identity/user-state/application/external/behaviors/persistence/listen-by-id"
import { Observable, of } from "rxjs"
import { shareReplay, switchMap } from "rxjs/operators"

export function construct(auth: AuthClient, listenById: ListenById) {
  return auth.user.pipe(
    ignoreNullish(),
    switchMap<AuthClientUser, Observable<UserState | undefined>>((user) => {
      if (user.isAnonymous) {
        return of({ id: user.uid })
      }
      return listenById(user.uid)
    }),
    shareReplay(1),
  )
}

export type UserState$ = ReturnType<typeof construct>
