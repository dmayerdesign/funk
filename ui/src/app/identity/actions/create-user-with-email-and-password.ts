import { AngularFireAuth } from "@angular/fire/auth"
import { SendEmailVerification } from "@funk/ui/app/identity/actions/send-email-verification"

export function construct(
  auth: AngularFireAuth,
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
