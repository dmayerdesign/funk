import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
): typeof signInWithEmailAndPassword

export default function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<void>

export type SignInWithEmailAndPassword = ReturnType<typeof construct>
