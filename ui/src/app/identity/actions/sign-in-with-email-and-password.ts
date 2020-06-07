import { AngularFireAuth } from "@angular/fire/auth"

export function construct(
  auth: AngularFireAuth
)
{
  return async function(
    email: string,
    password: string
  ): Promise<void>
  {
    await auth.signInWithEmailAndPassword(
      email, password
    )
  }
}

export type SignInWithEmailAndPassword = ReturnType<typeof construct>
