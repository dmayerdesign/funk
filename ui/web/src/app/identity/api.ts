import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserConfig } from '@funk/shared/contracts/user/user-config'
import { auth } from 'firebase'
import { distinctUntilChanged, switchMap } from 'rxjs/operators'

@Injectable()
export class IdentityApi {
  public user$ = this._fireAuth.user.pipe(
    distinctUntilChanged(),
    switchMap((user) => {
      return this._firestore.collection('user-configs').doc<UserConfig>(user.uid).valueChanges()
    })
  )

  constructor(
    private _fireAuth: AngularFireAuth,
    private _firestore: AngularFirestore,
  ) { }

  public async init(): Promise<auth.UserCredential> {
    return this._fireAuth.auth.signInAnonymously()
  }
}
