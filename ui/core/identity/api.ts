import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { UserHydrated } from '@funk/model/user/user-hydrated'
import { Initializer } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { auth, User } from 'firebase'
import { combineLatest, of, Observable } from 'rxjs'
import { distinctUntilKeyChanged, first, map, shareReplay, switchMap } from 'rxjs/operators'

@Injectable()
export class IdentityApi implements Initializer
{
  private _nonNullAuthUser$ = this._auth.user.pipe(
    ignoreNullish(),
    shareReplay(1),
  )
  public user$ = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged('uid'),
    switchMap<User, Observable<UserHydrated>>((user) =>
    {
      if (user.isAnonymous)
      {
        return of<UserConfig>({ id: '1', displayName: 'Guest' })
      }
      return combineLatest(
        this._store.collection(USER_CONFIGS)
            .doc<UserConfig>(user.uid)
            .valueChanges(),
        user.getIdTokenResult(true),
      )
      .pipe(
        map(([ userConfig, _user ]) => ({
          ...userConfig,
          claims: _user.claims,
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

  constructor(
    private _auth: AngularFireAuth,
    private _store: AngularFirestore,
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
