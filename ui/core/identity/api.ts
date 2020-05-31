import { Inject, Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { CustomClaims } from "@funk/model/auth/custom-claims"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { USER_CONFIGS, UserConfig } from "@funk/model/identity/user-config"
import { UserHydrated } from "@funk/model/identity/user-hydrated"
import { USER_STATES, UserState } from "@funk/model/identity/user-state"
import { Identity } from "@funk/ui/core/identity/interface"
import { User, auth } from "firebase"
import { Observable, combineLatest, of } from "rxjs"
import { distinctUntilKeyChanged, first, map, shareReplay, switchMap } from "rxjs/operators"
import { LISTEN_BY_ID } from "@funk/ui/core/persistence/tokens"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { asPromise } from "@funk/helpers/as-promise"

@Injectable()
export class IdentityApi implements Identity
{
  private _nonNullAuthUser$ = this._auth.user.pipe(
    ignoreNullish(),
    shareReplay(1)
  )
  public user$: Observable<UserHydrated> = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged("uid"),
    switchMap<User, Observable<UserHydrated>>((user) =>
    {
      if (user.isAnonymous)
      {
        return of({ id: user.uid, displayName: "Guest", isAnonymous: true })
      }
      return combineLatest(
        this._listenById<UserConfig>(USER_CONFIGS, user.uid),
        user.getIdTokenResult(true)
      )
        .pipe(
          map(([ userConfig, _user ]) => ({
            ...(userConfig || {}),
            id: user.uid,
            claims: _user.claims as CustomClaims,
            isAnonymous: false,
          })),
          shareReplay(1)
        )
    }),
    shareReplay(1)
  )
  public userId$: Observable<string> = this.user$.pipe(
    map(({ id }) => id as string)
  )
  public userIdToken$: Observable<string> = this._nonNullAuthUser$.pipe(
    switchMap((user) => user.getIdToken()),
    shareReplay(1)
  )
  public userRole$ = this.user$.pipe(
    map(({ claims }) => claims && claims.role)
  )
  public hasAdminPrivilegeOrGreater$ = this.userRole$.pipe(
    map((role) => role && roleHasAdminPrivilegeOrGreater(role))
  )
  public userState$ = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged("uid"),
    switchMap<User, Observable<UserState | undefined>>((user) =>
    {
      if (user.isAnonymous) return of({ id: user.uid })
      return this._listenById<UserState>(USER_STATES, user.uid)
    }),
    shareReplay(1)
  )

  public constructor(
    private _auth: AngularFireAuth,
    @Inject(LISTEN_BY_ID) private _listenById: ReturnType<typeof constructListenById>
  )
  {
    this.init()
  }

  public init(): void
  {
    this.user$.subscribe()
    this.userIdToken$.subscribe()
    this._signInAnonymouslyIfUserIsNull()
  }

  public async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential>
  {
    const userCredential = await this._auth.createUserWithEmailAndPassword(
      email, password
    )
    await this.sendEmailVerification()
    return userCredential
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<auth.UserCredential>
  {
    return this._auth.signInWithEmailAndPassword(email, password)
  }

  public async signOut(): Promise<void>
  {
    this._auth.signOut()
  }

  public async sendEmailVerification(): Promise<void>
  {
    const user = await this._nonNullAuthUser$.pipe(first()).toPromise()
    if (user)
    {
      user.sendEmailVerification()
    }
  }

  private async _signInAnonymouslyIfUserIsNull(): Promise<void>
  {
    const userOrNull = asPromise(this._auth.authState)
    if (userOrNull === null)
    {
      await this._auth.signInAnonymously()
    }
  }
}
