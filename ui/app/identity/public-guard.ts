import { Injectable, Inject } from "@angular/core"
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { AnonymousGuard } from "@funk/ui/app/identity/anonymous-guard"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { Observable, of } from "rxjs"
import { map, switchMap } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class PublicGuard implements CanActivate
{
  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    private _anonymousGuard: AnonymousGuard,
    private _router: Router
  )
  { }

  public canActivate(
    ...params: [ ActivatedRouteSnapshot, RouterStateSnapshot ]
  ): Observable<true | UrlTree>
  {
    return this._anonymousGuard.canActivate(...params).pipe(
      switchMap((canActivate) =>
      {
        if (canActivate === true)
        {
          return this._userSession.pipe(
            map(({ auth }) => roleHasAdminPrivilegeOrGreater(auth.claims.role)
              || this._router.parseUrl("/not-found")))
        }
        return of(canActivate)
      })
    )
  }
}
