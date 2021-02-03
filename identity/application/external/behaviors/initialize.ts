import { UserRole } from "@funk/auth/domain/user-role"
import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { asPromise } from "@funk/helpers/as-promise"
import { UserIdToken } from "@funk/identity/application/external/user-id-token"
import { UserSession } from "@funk/identity/application/external/user-session"

export function construct(
  auth: AuthClient,
  userSession: UserSession,
  userIdToken: UserIdToken,
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
