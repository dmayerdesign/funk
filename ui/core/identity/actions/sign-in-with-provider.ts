
import { AuthClient, AuthProvider } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
)
{
  return async function(provider: AuthProvider): Promise<void>
  {
    auth.useDeviceLanguage()
    await auth.signInWithPopup(provider)
  }
}

export type SignInWithProvider = ReturnType<typeof construct>
