import { AngularFireAuth } from "@angular/fire/auth"
import { asPromise } from "@funk/helpers/as-promise"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"

export function construct(
  auth: AngularFireAuth
)
{
  return async function(): Promise<void>
  {
    const user = await asPromise(auth.user.pipe(ignoreNullish()))
    user?.sendEmailVerification()
  }
}

type SendEmailVerification = ReturnType<typeof construct>
export default SendEmailVerification
