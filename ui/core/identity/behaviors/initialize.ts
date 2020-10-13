import { asPromise } from "@funk/helpers/as-promise"
import { UserRole } from "@funk/model/auth/user-role"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { AuthClient } from "@funk/ui/plugins/auth/auth-client"

export function construct(
  auth: AuthClient,
  userSession: UserSession,
  userIdToken: UserIdToken
) {
  return (): void => {
    ;(async function (): Promise<void> {
      userSession.subscribe()
      userIdToken.subscribe()

      const maybeIdTokenResult = await asPromise(auth.idTokenResult)
      if (
        !maybeIdTokenResult?.claims?.role ||
        maybeIdTokenResult?.claims?.role === UserRole.ANONYMOUS
      ) {
        await auth.signInAnonymously()
      }
    })()
  }
}

export type Initialize = ReturnType<typeof construct>
