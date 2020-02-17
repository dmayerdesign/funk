import { AngularFireAuth } from '@angular/fire/auth'
import { Router, UrlTree } from '@angular/router'
import createUid from '@funk/helpers/create-uid'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig } from '@funk/model/user/user-config'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { auth, User } from 'firebase'
import { of, BehaviorSubject } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { StoreApi } from '../store/api'
import { AdministratorGuard } from './administrator-guard'
import { AnonymousGuard } from './anonymous-guard'

const USER_UID = createUid()

export const ID_TOKEN_STUB = 'test-token'

export const createIdTokenResultStub = (role = UserRole.ANONYMOUS) => ({
  claims: { role },
}) as unknown as auth.IdTokenResult

export const createUserConfigStub = (email = 'test@test.com') => ({
  id: USER_UID,
  displayName: 'Test',
  email,
}) as UserConfig

export const createUserStub = (role = UserRole.ANONYMOUS, email?: string) => ({
  ...createUserConfigStub(email),
  ...createIdTokenResultStub(role),
})

export const createAuthUserStub = (role = UserRole.ANONYMOUS) => ({
  uid: USER_UID,
  getIdToken: async (..._args: any[]) => ID_TOKEN_STUB,
  getIdTokenResult: async (..._args: any[]) => createIdTokenResultStub(role),
  sendEmailVerification: async (..._args: any[]) => { },
  emailVerified: true,
}) as unknown as User

export const createUserCredentialStub = (
  authUserStub = createAuthUserStub()
) => ({
  credential: null,
  user: authUserStub,
})

export const createAuthStub = (authUserStub = createAuthUserStub()) => ({
  user: new BehaviorSubject(authUserStub),
  auth: {
    createUserWithEmailAndPassword: async (..._args: any[]) =>
      createUserCredentialStub(authUserStub),
    signInWithEmailAndPassword: async (..._args: any[]) =>
      createUserCredentialStub(authUserStub),
    signOut: async () => { },
    signInAnonymously: () => { },
    currentUser: authUserStub,
  },
  authState: new BehaviorSubject(authUserStub),
}) as unknown as AngularFireAuth

export const createStoreStub = (email = 'test@test.com') => ({
  getDocumentValueChanges: (..._valueChangesArgs: any[]) => of(createUserConfigStub(email))
    .pipe(shareReplay(1)),
}) as StoreApi

export const createStubbedIdentityApi = () =>
  new IdentityApi(createAuthStub(), createStoreStub())

export const createRouterStub = () => (
  {
    parseUrl: (_url: string) => new UrlTree(),
  } as Router
)

export const createStubbedAdministratorGuard = (userStubRole = UserRole.ANONYMOUS) =>
  new AdministratorGuard(
    createAuthStub(createAuthUserStub(userStubRole)),
    createRouterStub()
  )

export const createStubbedAnonymousGuard = (userStubRole = UserRole.ANONYMOUS) =>
  new AnonymousGuard(
    createAuthStub(createAuthUserStub(userStubRole)),
    createRouterStub()
  )
