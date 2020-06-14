import { SendEmailVerification } from "@funk/ui/core/identity/actions/send-email-verification"
import { AuthClient } from "@funk/plugins/auth/auth-client"

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

