
import { AuthClient, AuthProvider } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
): SignInWithProvider

export type SignInWithProvider = (provider: AuthProvider) => Promise<void>
