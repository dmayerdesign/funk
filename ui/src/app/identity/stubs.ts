import { AngularFireAuth } from "@angular/fire/auth"
import { Router, UrlTree } from "@angular/router"
import { CustomClaims } from "@funk/model/auth/custom-claims"
import { UserRole } from "@funk/model/auth/user-role"
import { Person } from "@funk/model/identity/person"
import { AdministratorGuard } from "@funk/ui/app/identity/administrator-guard"
import { User } from "firebase"
import { BehaviorSubject, of } from "rxjs"

export const FAKE_USER_UID = "user-1"
export const FAKE_ID_TOKEN = "test-token"

export const createIdTokenResultStub = (role = UserRole.ANONYMOUS) => ({
  claims: { role } as CustomClaims,
})

export const createFakePerson = ({
  id = FAKE_USER_UID,
  displayName = "Test",
  email = "test@test.com",
} = {}) => ({ id, displayName, email }) as Person

export const createAuthUserStub = (role = UserRole.ANONYMOUS) => ({
  uid: FAKE_USER_UID,
  getIdToken: async (..._args: any[]) => FAKE_ID_TOKEN,
  getIdTokenResult: async (..._args: any[]) => createIdTokenResultStub(role),
  sendEmailVerification: async (..._args: any[]) => { },
  emailVerified: role !== UserRole.ANONYMOUS,
  isAnonymous: role === UserRole.ANONYMOUS,
}) as unknown as User

export const createUserCredentialStub = (
  authUserStub = createAuthUserStub()
) => ({
  credential: null,
  user: authUserStub,
})

export const createAuthStub = (authUserStub = createAuthUserStub()) => ({
  user: new BehaviorSubject(authUserStub),
  createUserWithEmailAndPassword: async (..._args: any[]) =>
    createUserCredentialStub(authUserStub),
  signInWithEmailAndPassword: async (..._args: any[]) =>
    createUserCredentialStub(authUserStub),
  signOut: async () => { },
  signInAnonymously: () => { },
  currentUser: authUserStub,
  authState: new BehaviorSubject(authUserStub),
  idTokenResult: of({}),
}) as unknown as AngularFireAuth

export const createRouterStub = () => ({
  parseUrl: (_url: string) => new UrlTree(),
} as Router)

export const createStubbedAdministratorGuard = (userRole = UserRole.ANONYMOUS) =>
  new AdministratorGuard(
    createAuthStub(createAuthUserStub(userRole)),
    createRouterStub()
  )