import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { CanActivate } from '@angular/router'
import getVerifiedRole from '@funk/model/auth/actions/get-verified-role'
import { CustomClaims } from '@funk/model/auth/custom-claims'
import roleHasAdminPrivilegeOrGreater from '@funk/model/auth/helpers/role-has-admin-privilege-or-greater'
import { from, of, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AdministratorGuard implements CanActivate
{
  constructor(
    private _auth: AngularFireAuth,
  )
  { }

  public canActivate(): Observable<boolean>
  {
    return this._auth.user.pipe(
      switchMap((user) => !user
        ? of(false)
        : from(user.getIdTokenResult()).pipe(
          map((idTokenResult) => getVerifiedRole(user, idTokenResult.claims as CustomClaims)),
          map(roleHasAdminPrivilegeOrGreater),
        ),
      ),
    )
  }
}
