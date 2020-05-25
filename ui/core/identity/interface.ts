import { UserRole } from "@funk/model/auth/user-role"
import { UserHydrated } from "@funk/model/identity/user-hydrated"
import { UserState } from "@funk/model/identity/user-state"
import { Initializer } from "@funk/ui/helpers/initializer"
import { auth } from "firebase"
import { Observable } from "rxjs"

export const IDENTITY = "IDENTITY"

export interface Identity extends Initializer {
  user$: Observable<UserHydrated>
  userId$: Observable<string>
  userIdToken$: Observable<string>
  userRole$: Observable<UserRole | undefined>
  hasAdminPrivilegeOrGreater$: Observable<boolean | undefined>
  userState$: Observable<UserState | undefined>

  init(): Promise<void>
  createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<auth.UserCredential>
  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<auth.UserCredential>
  signOut(): Promise<void>
  sendEmailVerification(): Promise<void>
}
