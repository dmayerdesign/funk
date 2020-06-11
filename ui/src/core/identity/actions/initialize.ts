import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { AuthClient } from "@funk/plugins/auth/auth-client"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"

export function construct(
  auth: AuthClient,
  userSession: UserSession,
  userIdToken: UserIdToken
)
{
  return (): void =>
  {
    (async function(): Promise<void>
    {
      userSession.subscribe()
      userIdToken.subscribe()

      const maybeIdTokenResult = await asPromise(auth.idTokenResult)
      if (!maybeIdTokenResult?.claims?.role
        || maybeIdTokenResult?.claims?.role === UserRole.ANONYMOUS)
      {
        await auth.signInAnonymously()
      }
    })()
  }
}

export type Initialize = ReturnType<typeof construct>

