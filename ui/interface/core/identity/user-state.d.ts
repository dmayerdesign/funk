import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { Observable } from "rxjs"
import { UserState as IUserState } from "@funk/model/identity/user-state"
import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>
): Observable<IUserState | undefined>

export type UserState = ReturnType<typeof construct>
