import { AuthClient } from "@funk/plugins/auth/auth-client"

export function construct(
  auth: AuthClient
)
{
  return async function(): Promise<void>
  {
    await auth.signOut()
  }
}

export type SignOut = ReturnType<typeof construct>
