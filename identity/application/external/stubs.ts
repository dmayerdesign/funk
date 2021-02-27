import { Router, UrlTree } from "@angular/router"
import { CustomClaims } from "@funk/auth/model/custom-claims"
import { UserRole } from "@funk/auth/model/user-role"
import {
  AuthClient,
  AuthClientUser,
} from "@funk/auth/plugins/external/auth-client"
import { UserSession } from "@funk/identity/application/external/user-session"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { PublicGuard } from "@funk/identity/infrastructure/external/public-guard"
import { FAKE_ID_TOKEN, FAKE_USER_UID } from "@funk/identity/model/stubs"
import { BehaviorSubject, Observable, of } from "rxjs"

const createIdTokenResultStub = (role = UserRole.ANONYMOUS) => ({
  claims: { role } as CustomClaims,
})

export const createUserSession = (role: UserRole) =>
  of({ auth: { claims: { role } } }) as UserSession

export const createAuthUserStub = (
  role = UserRole.ANONYMOUS,
  userId = FAKE_USER_UID,
) =>
  (({
    uid: userId,
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
