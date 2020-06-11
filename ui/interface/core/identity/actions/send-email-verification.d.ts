import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
): typeof sendEmailVerification

export default function sendEmailVerification(): Promise<void>

export type SendEmailVerification = ReturnType<typeof construct>
