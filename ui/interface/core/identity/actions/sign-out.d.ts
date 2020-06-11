import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
): typeof signOut

export default function signOut(): Promise<void>

export type SignOut = ReturnType<typeof construct>
