import { AngularFireAuth } from "@angular/fire/auth"

export function construct(
  auth: AngularFireAuth
)
{
  return async function(): Promise<void>
  {
    await auth.signOut()
  }
}

export type SignOut = ReturnType<typeof construct>
