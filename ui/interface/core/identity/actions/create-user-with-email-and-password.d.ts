import { SendEmailVerification } from "@funk/ui/core/identity/actions/send-email-verification"
import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient,
  sendEmailVerification: SendEmailVerification
): typeof createUserWithEmailAndPassword

export default function createUserWithEmailAndPassword(
  email: string,
  password: string
): Promise<void>

export type CreateUserWithEmailAndPassword = ReturnType<typeof construct>
