import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserState as IUserState, USER_STATES } from "@funk/model/identity/user-state"
import { AuthClient, AuthClientUser } from "@funk/plugins/auth/auth-client"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { switchMap, shareReplay } from "rxjs/operators"
import { of, Observable } from "rxjs"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>
)
{
  return auth.user.pipe(
    ignoreNullish(),
    switchMap<AuthClientUser, Observable<IUserState | undefined>>((user) =>
    {
      if (user.isAnonymous)
      {
        return of({ id: user.uid })
      }
      return listenById<IUserState>(USER_STATES, user.uid)
    }),
    shareReplay(1)
  )
}

export type UserState = ReturnType<typeof construct>
