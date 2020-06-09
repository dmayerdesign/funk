import { AuthClient } from "@funk/plugins/auth/auth-client"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { shareReplay, map } from "rxjs/operators"

export function construct(
  auth: AuthClient
)
{
  return auth.user.pipe(
    ignoreNullish(),
    map((authUser) => authUser.getIdToken()),
    shareReplay(1)
  )
}

export type UserIdToken = ReturnType<typeof construct>
