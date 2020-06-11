import { AuthClient } from "@funk/plugins/auth/auth-client"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"

export function construct(
  auth: AuthClient,
  userSession: UserSession,
  userIdToken: UserIdToken
): typeof initialize

export default function initialize(): void

export type Initialize = ReturnType<typeof construct>

