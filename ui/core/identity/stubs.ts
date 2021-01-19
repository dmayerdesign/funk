import { Router, UrlTree } from "@angular/router"
import { CustomClaims } from "@funk/model/auth/custom-claims"
import { UserRole } from "@funk/model/auth/user-role"
import { Person } from "@funk/model/identity/person"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { PublicGuard } from "@funk/ui/app/identity/public-guard"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { AuthClient, AuthClientUser } from "@funk/ui/plugins/auth/auth-client"
import { BehaviorSubject, Observable, of } from "rxjs"

export const FAKE_USER_UID = "user-1"
export const FAKE_ID_TOKEN = "test-token"

const createIdTokenResultStub = (role = UserRole.ANONYMOUS) => ({
  claims: { role } as CustomClaims,
})

export const createUserSession = (role: UserRole) =>
  of({ auth: { claims: { role } } }) as UserSession

export const createFakePerson = ({
  id = FAKE_USER_UID,
  displayName = "Test",
  email = "test@test.com",
} = {}) => ({ id, displayName, email } as Person)

export const createAuthUserStub = (role = UserRole.ANONYMOUS) =>
  (({
    uid: FAKE_USER_UID,
    getIdToken: async (..._args: any[]) => FAKE_ID_TOKEN,
    getIdTokenResult: async (..._args: any[]) => createIdTokenResultStub(role),
    sendEmailVerification: async (..._args: any[]) => {},
    emailVerified: role !== UserRole.ANONYMOUS,
    isAnonymous: role === UserRole.ANONYMOUS,
  } as unknown) as AuthClientUser)

export const createUserCredentialStub = (
  authUserStub = createAuthUserStub(),
) => ({
  credential: null,
  user: authUserStub,
})

export const createAuthClientStub = (authUserStub = createAuthUserStub()) =>
  (({
    user: new BehaviorSubject(authUserStub) as Observable<AuthClientUser>,
    createUserWithEmailAndPassword: async (..._args: any[]) =>
      createUserCredentialStub(authUserStub),
    signInWithEmailAndPassword: async (..._args: any[]) =>
      createUserCredentialStub(authUserStub),
    signOut: async () => {},
    signInAnonymously: async () => {},
    signInWithPopup: async () => {},
    useDeviceLanguage: () => {},
    currentUser: authUserStub,
    authState: new BehaviorSubject(authUserStub),
    idTokenResult: of({}) as AuthClient["idTokenResult"],
  } as unknown) as AuthClient)

export const createRouterStub = () =>
  ({
    parseUrl: (_url: string) => new UrlTree(),
  } as Router)

export const createStubbedPublicGuard = (userRole = UserRole.ANONYMOUS) =>
  new PublicGuard(
    createUserSession(userRole),
    ({
      canActivate: jest.fn().mockReturnValue(of(true)),
    } as Partial<AnonymousGuard>) as AnonymousGuard,
    createRouterStub(),
  )
