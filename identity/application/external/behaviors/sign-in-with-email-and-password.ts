import { AuthClient } from "@funk/auth/plugins/external/auth-client"

export function construct(auth: AuthClient) {
  return async function (email: string, password: string): Promise<void> {
    await auth.signInWithEmailAndPassword(email, password)
  }
}

export type SignInWithEmailAndPassword = ReturnType<typeof construct>
