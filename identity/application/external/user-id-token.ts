import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { shareReplay, switchMap } from "rxjs/operators"

export function construct(auth: AuthClient) {
  return auth.user.pipe(
    ignoreNullish(),
    switchMap((authUser) => authUser.getIdToken()),
    shareReplay(1),
  )
}

export type UserIdToken = ReturnType<typeof construct>
