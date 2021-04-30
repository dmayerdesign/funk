import { AuthClient } from "@funk/auth/plugins/external/auth-client"

export function construct(auth: AuthClient, window: Window) {
  return async function (): Promise<void> {
    await auth.signOut()
    window.location.reload()
  }
}

export type SignOut = ReturnType<typeof construct>
