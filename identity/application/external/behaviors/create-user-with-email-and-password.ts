import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { SendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"

export function construct(
  auth: AuthClient,
  sendEmailVerification: SendEmailVerification,
) {
  return async function (email: string, password: string): Promise<void> {
    await auth.createUserWithEmailAndPassword(email, password)
    await sendEmailVerification()
  }
}

export type CreateUserWithEmailAndPassword = ReturnType<typeof construct>
