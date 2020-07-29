import { Inject, Injectable } from "@angular/core"
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router"
import roleHasPublicPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-public-privilege-or-greater"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class AnonymousGuard implements CanActivate
{
  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    private _router: Router
  )
  { }

  public canActivate(
    _activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<true | UrlTree>
  {
    return this._userSession.pipe(
      map(({ auth }) => roleHasPublicPrivilegeOrGreater(auth.claims?.role)
        || this._router.parseUrl("/sign-in?on-sign-in-go-to=" + routerState.url))
    )
  }
}
