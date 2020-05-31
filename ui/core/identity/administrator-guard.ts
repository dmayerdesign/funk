import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { CanActivate, Router, UrlTree } from "@angular/router"
import getVerifiedRole from "@funk/model/auth/actions/get-verified-role"
import { CustomClaims } from "@funk/model/auth/custom-claims"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { Observable, from, of } from "rxjs"
import { map, switchMap } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class AdministratorGuard implements CanActivate
{
  public constructor(
    private _auth: AngularFireAuth,
    private _router: Router
  )
  { }

  public canActivate(): Observable<true | UrlTree>
  {
    return this._auth.user.pipe(
      switchMap((user) => !user
        ? of(false)
        : from(user.getIdTokenResult()).pipe(
          map((idTokenResult) =>
            getVerifiedRole(user, idTokenResult.claims as CustomClaims)),
          map(roleHasAdminPrivilegeOrGreater)
        )
      ),
      map((canActivate) => canActivate
        || this._router.parseUrl("/")
      )
    )
  }
}
