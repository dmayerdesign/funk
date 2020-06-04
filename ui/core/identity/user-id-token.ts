import { AngularFireAuth } from "@angular/fire/auth"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { shareReplay, map } from "rxjs/operators"

export function construct(
  auth: AngularFireAuth
)
{
  return auth.user.pipe(
    ignoreNullish(),
    map((authUser) => authUser.getIdToken()),
    shareReplay(1)
  )
}

type UserIdToken = ReturnType<typeof construct>
export default UserIdToken
