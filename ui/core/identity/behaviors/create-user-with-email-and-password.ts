import { SendEmailVerification } from "@funk/ui/core/identity/behaviors/send-email-verification"
import { AuthClient } from "@funk/ui/plugins/auth/auth-client"

export function construct(
  auth: AuthClient,
  sendEmailVerification: SendEmailVerification
)
{
  return async function(
    email: string,
    password: string
  ): Promise<void>
  {
    await auth.createUserWithEmailAndPassword(
      email, password
    )
    await sendEmailVerification()
  }
}

export type CreateUserWithEmailAndPassword = ReturnType<typeof construct>

