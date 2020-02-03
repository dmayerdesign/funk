import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { CanActivate } from '@angular/router'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig, USER_CONFIGS } from '@funk/model/user/user-config'
import { of, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AdministratorGuard implements CanActivate
{
  constructor(
    private _auth: AngularFireAuth,
    private _store: AngularFirestore,
  )
  { }

  public canActivate(): Observable<boolean>
  {
    return this._auth.user.pipe(
      switchMap((user) => !user
        ? of(user)
        : this._store.collection(USER_CONFIGS).doc<UserConfig>(user.uid).valueChanges()),
      map((userConfig) => !!userConfig && (
        userConfig.role === UserRole.SUPER
        || userConfig.role === UserRole.OWNER
      ))
    )
  }
}
