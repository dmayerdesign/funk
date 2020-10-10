import { AuthClient } from "@funk/ui/plugins/auth/auth-client"
import { asPromise } from "@funk/helpers/as-promise"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"

export function construct(auth: AuthClient) {
  return async function (): Promise<void> {
    const user = await asPromise(auth.user.pipe(ignoreNullish()))
    if (user?.email && !user.emailVerified) {
      await user.sendEmailVerification()
    }
  }
}

export type SendEmailVerification = ReturnType<typeof construct>
