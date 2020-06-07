import { AngularFireAuth } from "@angular/fire/auth"
import { UserRole } from "@funk/model/auth/user-role"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/ui/app/identity/user-session"
import { UserIdToken } from "@funk/ui/app/identity/user-id-token"

export function construct(
  auth: AngularFireAuth,
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

