import { UserRole } from "@funk/model/auth/user-role"
import { UserHydrated } from "@funk/model/identity/user-hydrated"
import { UserState } from "@funk/model/identity/user-state"
import { auth } from "firebase"
import { Observable } from "rxjs"

export const IDENTITY = "IDENTITY"

export interface Identity {
  user$: Observable<UserHydrated>
  userId$: Observable<string>
  userIdToken$: Observable<string>
  userRole$: Observable<UserRole | undefined>
  hasAdminPrivilegeOrGreater$: Observable<boolean | undefined>
  userState$: Observable<UserState | undefined>

  init(): void
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
