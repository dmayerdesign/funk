import { AuthClient } from "@funk/auth/plugins/external/auth-client"

export function construct(auth: AuthClient) {
  return async function (): Promise<void> {
    await auth.signOut()
  }
}

export type SignOut = ReturnType<typeof construct>
