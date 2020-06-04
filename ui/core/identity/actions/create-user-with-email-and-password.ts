import { AngularFireAuth } from "@angular/fire/auth"
import SendEmailVerification from "@funk/ui/core/identity/actions/send-email-verification"

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

type CreateUserWithEmailAndPassword = ReturnType<typeof construct>
export default CreateUserWithEmailAndPassword
