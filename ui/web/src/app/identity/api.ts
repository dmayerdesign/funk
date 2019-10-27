import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserConfig } from '@funk/model/user/user-config'
import { ModuleApi } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { auth, User } from 'firebase'
import { of, Observable } from 'rxjs'
import { distinctUntilKeyChanged, switchMap } from 'rxjs/operators'

@Injectable()
export class IdentityApi implements ModuleApi {
  private _nonNullAuthUser$ = this._fireAuth.user as Observable<User>
  public user$ = this._nonNullAuthUser$.pipe(
    ignoreNullish(),
    distinctUntilKeyChanged<User>('uid'),
    switchMap((user) => {
      if (user.isAnonymous) {
        return of<UserConfig>({ id: '1', displayName: 'Guest' })
      }
      return this._firestore.collection('user-configs')
        .doc<UserConfig>(user.uid)
        .valueChanges()
    })
  )

  constructor(
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
  ) { }

  public async init(): Promise<void> {
    await this._fireAuth.auth.signInAnonymously()
  }

  public async createUserWithEmailAndPassword(
    email: string, password: string, userConfig?: Partial<UserConfig>
  ): Promise<auth.UserCredential> {
    const userCredential = await this._fireAuth.auth.createUserWithEmailAndPassword(
      email, password
    )
    return userCredential
  }

  public async signInWithEmailAndPassword(
    email: string, password: string
  ): Promise<auth.UserCredential> {
    return this._fireAuth.auth.signInWithEmailAndPassword(email, password)
  }
}
