import {
  AuthClient,
  AuthClientUser,
} from "@funk/auth/plugins/external/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import {
  UserState as IUserState,
  USER_STATES,
} from "@funk/identity/model/user-state"
import { construct as constructListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable, of } from "rxjs"
import { shareReplay, switchMap } from "rxjs/operators"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>,
) {
  return auth.user.pipe(
    ignoreNullish(),
    switchMap<AuthClientUser, Observable<IUserState | undefined>>((user) => {
      if (user.isAnonymous) {
        return of({ id: user.uid })
      }
      return listenById<IUserState>(USER_STATES, user.uid)
    }),
    shareReplay(1),
  )
}

export type UserState = ReturnType<typeof construct>
