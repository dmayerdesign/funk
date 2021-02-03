import {
  AuthClient,
  AuthProvider,
} from "@funk/auth/plugins/external/auth-client"
import { SendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"

export function construct(
  auth: AuthClient,
  sendEmailVerification: SendEmailVerification,
) {
  return async function (provider: AuthProvider): Promise<void> {
    auth.useDeviceLanguage()
    await auth.signInWithPopup(provider)
    await sendEmailVerification()
  }
}

export type SignInWithProvider = ReturnType<typeof construct>
