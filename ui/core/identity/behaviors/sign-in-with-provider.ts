import { AuthClient, AuthProvider } from "@funk/ui/plugins/auth/auth-client"
import { SendEmailVerification } from "@funk/ui/core/identity/behaviors/send-email-verification"

export function construct(
  auth: AuthClient,
  sendEmailVerification: SendEmailVerification
)
{
  return async function(provider: AuthProvider): Promise<void>
  {
    auth.useDeviceLanguage()
    await auth.signInWithPopup(provider)
    await sendEmailVerification()
  }
}

export type SignInWithProvider = ReturnType<typeof construct>
