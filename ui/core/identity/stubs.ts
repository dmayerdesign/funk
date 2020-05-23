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
import { Persistence } from '@funk/ui/core/persistence/interface'
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
  isAnonymous: role === UserRole.ANONYMOUS,
})

export const createAuthUserStub = (role = UserRole.ANONYMOUS) => ({
  uid: USER_UID_STUB,
  getIdToken: async (..._args: any[]) => ID_TOKEN_STUB,
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
}) as unknown as AngularFireAuth

export const createStoreStub = (email = 'test@test.com') => ({
  listenById: (..._valueChangesArgs: any[]) => of(createUserConfigStub(email))
    .pipe(shareReplay(1)),
}) as Persistence

export const createStubbedIdentityApi = (userRole = UserRole.ANONYMOUS) =>
  new IdentityApi(createAuthStub(createAuthUserStub(userRole)), createStoreStub())

export const createRouterStub = () => (
  {
    parseUrl: (_url: string) => new UrlTree(),
  } as Router
)

export const createStubbedAdministratorGuard = (userRole = UserRole.ANONYMOUS) =>
  new AdministratorGuard(
    createAuthStub(createAuthUserStub(userRole)),
    createRouterStub()
  )

export const createStubbedAnonymousGuard = (userRole = UserRole.ANONYMOUS) =>
  new AnonymousGuard(
    createStubbedIdentityApi(userRole),
    createRouterStub()
  )

export class IdentityStub implements Identity
{
  private _email: string
  private _role: UserRole

  public user$ = of(createUserStub(this._role, this._email)).pipe(shareReplay(1))
  public userId$ = of(USER_UID_STUB).pipe(shareReplay(1))
  public userIdToken$ = of(ID_TOKEN_STUB).pipe(shareReplay(1))
  public userRole$ = of(this._role).pipe(shareReplay(1))
  public hasAdminPrivilegeOrGreater$ = of(
    roleHasAdminPrivilegeOrGreater(this._role)).pipe(shareReplay(1))
  public userState$ = of({ id: USER_UID_STUB } as UserState).pipe(shareReplay(1))

  constructor({
    email = 'test email',
    role = UserRole.PUBLIC,
  } = {})
  {
    this._email = email
    this._role = role
  }

  public async init(): Promise<void> { }
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
  public async signOut(): Promise<void> { }
  public async sendEmailVerification(): Promise<void> { }
}
