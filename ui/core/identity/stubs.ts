import { AngularFireAuth } from '@angular/fire/auth'
import { Router, UrlTree } from '@angular/router'
import { CustomClaims } from '@funk/model/auth/custom-claims'
import roleHasAdminPrivilegeOrGreater from '@funk/model/auth/helpers/role-has-admin-privilege-or-greater'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig } from '@funk/model/identity/user-config'
import { UserState } from '@funk/model/identity/user-state'
import { AdministratorGuard } from '@funk/ui/core/identity/administrator-guard'
import { AnonymousGuard } from '@funk/ui/core/identity/anonymous-guard'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { auth, User } from 'firebase'
import { of, BehaviorSubject } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

export const USER_UID_STUB = 'user-1'
export const ID_TOKEN_STUB = 'test-token'

export const createIdTokenResultStub = (role = UserRole.ANONYMOUS) => ({
  claims: { role } as CustomClaims,
})

export const createUserConfigStub = (email = 'test@test.com') => ({
  id: USER_UID_STUB,
  displayName: 'Test',
  email,
}) as UserConfig

export const createUserStub = (role = UserRole.ANONYMOUS, email?: string) => ({
  ...createUserConfigStub(email),
  ...createIdTokenResultStub(role),
  isAnonymous: false,
})

export const createAuthUserStub = (role = UserRole.ANONYMOUS) => ({
  uid: USER_UID_STUB,
  getIdToken: async (..._args: any[]) => ID_TOKEN_STUB,
  getIdTokenResult: async (..._args: any[]) => createIdTokenResultStub(role),
  sendEmailVerification: async (..._args: any[]) => { },
  emailVerified: true,
  isAnonymous: false,
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
}) as unknown as AngularFireAuth

export const createStoreStub = (email = 'test@test.com') => ({
  listenById: (..._valueChangesArgs: any[]) => of(createUserConfigStub(email))
    .pipe(shareReplay(1)),
}) as PersistenceApi

export const createStubbedIdentityApi = (userStubRole = UserRole.ANONYMOUS) =>
  new IdentityApi(createAuthStub(createAuthUserStub(userStubRole)), createStoreStub())

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
    createStubbedIdentityApi(userStubRole),
    createRouterStub()
  )

export class IdentityApiStub implements Identity
{
  public user$ = of(createUserStub(this._stubOptions.userRole)).pipe(shareReplay(1))
  public userId$ = of(USER_UID_STUB).pipe(shareReplay(1))
  public userIdToken$ = of(ID_TOKEN_STUB).pipe(shareReplay(1))
  public userRole$ = of(this._stubOptions.userRole).pipe(shareReplay(1))
  public hasAdminPrivilegeOrGreater$ = of(roleHasAdminPrivilegeOrGreater(
    this._stubOptions.userRole
  )).pipe(shareReplay(1))
  public userState$ = of(this._stubOptions.userState).pipe(shareReplay(1))

  constructor(private _stubOptions = {
    userId: USER_UID_STUB,
    userRole: UserRole.PUBLIC,
    userState: { id: USER_UID_STUB } as UserState,
  })
  { }

  public async init(): Promise<void>
  { }
  public async createUserWithEmailAndPassword(
    _email: string,
    _password: string,
  ): Promise<auth.UserCredential>
  {
    return {} as auth.UserCredential
  }
  public async signInWithEmailAndPassword(
    _email: string,
    _password: string,
  ): Promise<auth.UserCredential>
  {
    return {} as auth.UserCredential
  }
  public async signOut(): Promise<void>
  { }
  public async sendEmailVerification(): Promise<void>
  { }
}
