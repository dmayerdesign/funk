import { Injectable, OnDestroy } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { CustomClaims } from '@funk/model/auth/custom-claims'
import roleHasAdminPrivilegeOrGreater from '@funk/model/auth/helpers/role-has-admin-privilege-or-greater'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { UserHydrated } from '@funk/model/user/user-hydrated'
import { StoreApi } from '@funk/ui/core/store/api'
import { forLifeOf, Initializer, MortalityAware } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { auth, User } from 'firebase'
import { combineLatest, of, Observable } from 'rxjs'
import { distinctUntilKeyChanged, first, map, shareReplay, switchMap } from 'rxjs/operators'

@MortalityAware()
@Injectable()
export class IdentityApi implements Initializer, OnDestroy
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
        this._store.getDocumentValueChanges<UserConfig>(USER_CONFIGS, user.uid),
        user.getIdTokenResult(true),
      )
      .pipe(
        map(([ userConfig, _user ]) => ({
          ...(userConfig || {}),
          claims: _user.claims as CustomClaims,
        })),
        shareReplay(1),
      )
    }),
    shareReplay(1),
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

  constructor(
    private _auth: AngularFireAuth,
    private _store: StoreApi,
  )
  { }

  public ngOnDestroy(): void { }

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
        forLifeOf(this),
        switchMap((userOrNull) => userOrNull === null
          ? this._auth.auth.signInAnonymously().then(({ user }) => user)
          : of(userOrNull)),
      )
      .subscribe()
  }
}
