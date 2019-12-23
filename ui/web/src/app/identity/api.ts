import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { UserHydrated } from '@funk/model/user/user-hydrated'
import { ModuleApi } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { auth, User } from 'firebase'
import { from, of, Observable } from 'rxjs'
import { distinctUntilKeyChanged, map, switchMap, withLatestFrom } from 'rxjs/operators'

@Injectable()
export class IdentityApi implements ModuleApi
{
  private _nonNullAuthUser$ = this._fireAuth.user.pipe(ignoreNullish()) as Observable<User>
  public user$ = this._nonNullAuthUser$.pipe(
    distinctUntilKeyChanged('uid'),
    switchMap<User, Observable<UserHydrated>>((user) =>
    {
      if (user.isAnonymous)
      {
        return of<UserConfig>({ id: '1', displayName: 'Guest' })
      }
      return this._firestore.collection(USER_CONFIGS)
        .doc<UserConfig>(user.uid)
        .valueChanges()
        .pipe(
          withLatestFrom(from(user.getIdTokenResult(true))),
          map(([ userConfig, _user ]) => ({
            ...userConfig,
            claims: _user.claims,
          })),
        )
    }),
  )
  public firebaseIdToken$: Observable<string> = this._nonNullAuthUser$.pipe(
    switchMap((user) => user.getIdToken()),
  )

  constructor(
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
  )
  { }

  public async init(): Promise<void>
  {
    this._fireAuth.authState
      .pipe(
        switchMap((userOrNull) => userOrNull === null
          ? this._fireAuth.auth.signInAnonymously()
          : of(userOrNull)),
      )
      .subscribe(
        // () => this._fireAuth.auth.currentUser!.getIdToken(true).then(
        //   (value) => console.log(JSON.stringify([ value ])),
        // ),
      )
  }

  public async createUserWithEmailAndPassword(
    email: string, password: string,
  ): Promise<auth.UserCredential>
  {
    const userCredential = await this._fireAuth.auth.createUserWithEmailAndPassword(
      email, password,
    )
    return userCredential
  }

  public async signInWithEmailAndPassword(
    email: string, password: string,
  ): Promise<auth.UserCredential>
  {
    return this._fireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  public async signOut(): Promise<void>
  {
    this._fireAuth.auth.signOut()
  }
}
