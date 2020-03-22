import { Inject, Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { CustomClaims } from '@funk/model/auth/custom-claims'
import roleHasAdminPrivilegeOrGreater from '@funk/model/auth/helpers/role-has-admin-privilege-or-greater'
import { UserConfig, USER_CONFIGS } from '@funk/model/identity/user-config'
import { UserHydrated } from '@funk/model/identity/user-hydrated'
import { UserState, USER_STATES } from '@funk/model/identity/user-state'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { auth, User } from 'firebase'
import { combineLatest, of, Observable } from 'rxjs'
import { distinctUntilKeyChanged, first, map, shareReplay, switchMap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class IdentityApi implements Identity
{
  private _nonNullAuthUser$ = this._auth.user.pipe(
    ignoreNullish(),
    shareReplay(1),
  )
  public user$: Observable<UserHydrated> = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged('uid'),
    switchMap<User, Observable<UserHydrated>>((user) =>
    {
      if (user.isAnonymous)
      {
        return of<UserConfig>({ id: user.uid, displayName: 'Guest' })
      }
      return combineLatest(
        this._persistenceApi.listenById<UserConfig>(USER_CONFIGS, user.uid),
        user.getIdTokenResult(true),
      )
      .pipe(
        map(([ userConfig, _user ]) => ({
          ...(userConfig || {}),
          id: user.uid,
          claims: _user.claims as CustomClaims,
        })),
        shareReplay(1),
      )
    }),
    shareReplay(1),
  )
  public userId$: Observable<string> = this.user$.pipe(
    map(({ id }) => id as string),
  )
  public userIdToken$: Observable<string> = this._nonNullAuthUser$.pipe(
    switchMap((user) => user.getIdToken()),
    shareReplay(1),
  )
  public userRole$ = this.user$.pipe(
    map(({ claims }) => claims && claims.role),
  )
  public hasAdminPrivilegeOrGreater$ = this.userRole$.pipe(
    map((role) => role && roleHasAdminPrivilegeOrGreater(role)),
  )
  public userState$ = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged('uid'),
    switchMap<User, Observable<UserState | undefined>>((user) =>
    {
      if (user.isAnonymous) return of({ id: user.uid })
      return this._persistenceApi.listenById<UserState>(USER_STATES, user.uid)
    }),
    shareReplay(1),
  )

  constructor(
    private _auth: AngularFireAuth,
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
  )
  { }

  public async init(): Promise<void>
  {
    this.user$.subscribe()
    this.userIdToken$.subscribe()
    this._signInAnonymouslyIfUserIsNull()
  }

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<auth.UserCredential>
  {
    const userCredential = await this._auth.auth.createUserWithEmailAndPassword(
      email, password,
    )
    await this.sendEmailVerification()
    return userCredential
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<auth.UserCredential>
  {
    return this._auth.auth.signInWithEmailAndPassword(email, password)
  }

  public async signOut(): Promise<void>
  {
    this._auth.auth.signOut()
  }

  public async sendEmailVerification(): Promise<void>
  {
    const user = await this._nonNullAuthUser$.pipe(first()).toPromise()
    if (user)
    {
      user.sendEmailVerification()
    }
  }

  private _signInAnonymouslyIfUserIsNull(): void
  {
    this._auth.authState
      .pipe(
        switchMap((userOrNull) => userOrNull === null
          ? this._auth.auth.signInAnonymously().then(({ user }) => user)
          : of(userOrNull)),
      )
      .subscribe()
  }
}
