import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserConfig } from '@funk/shared/contracts/user/user-config'
import { auth } from 'firebase'
import { of } from 'rxjs'
import { distinctUntilKeyChanged, switchMap } from 'rxjs/operators'

@Injectable()
export class IdentityApi {
  public user$ = this._fireAuth.user.pipe(
    distinctUntilKeyChanged('uid'),
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
    email: string, password: string
  ): Promise<auth.UserCredential> {
    return this._fireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  public async signInWithEmailAndPassword(
    email: string, password: string
  ): Promise<auth.UserCredential> {
    return this._fireAuth.auth.signInWithEmailAndPassword(email, password)
  }
}
