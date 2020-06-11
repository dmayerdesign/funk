import { Injectable, Inject } from "@angular/core"
import { CanActivate, Router, UrlTree } from "@angular/router"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class AdministratorGuard implements CanActivate
{
  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    private _router: Router
  )
  { }

  public canActivate(): Observable<true | UrlTree>
  {
    return this._userSession.pipe(
      map(({ auth }) => roleHasAdminPrivilegeOrGreater(auth.claims.role)
        || this._router.parseUrl("/"))
    )
  }
}
