import { AuthClient } from "@funk/plugins/auth/auth-client"
import { Observable } from "rxjs"

export function construct(
  auth: AuthClient
): UserIdToken

export type UserIdToken = Observable<string>
