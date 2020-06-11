import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { UserSession as IUserSession } from "@funk/model/identity/user-session"
import { AuthClient } from "@funk/plugins/auth/auth-client"
import { Observable } from "rxjs"

export function construct(
  auth: AuthClient,
  listenById: ReturnType<typeof constructListenById>
): Observable<IUserSession>

export type UserSession = ReturnType<typeof construct>
