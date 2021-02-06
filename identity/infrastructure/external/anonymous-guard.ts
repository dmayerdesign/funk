import { Inject, Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router"
import roleHasPublicPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-public-privilege-or-greater"
import { UserSession } from "@funk/identity/application/external/user-session"
import { USER_SESSION } from "@funk/identity/infrastructure/external/tokens"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class AnonymousGuard implements CanActivate {
  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    private _router: Router,
  ) {}

  public canActivate(
    _activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot,
  ): Observable<true | UrlTree> {
    return this._userSession.pipe(
      map(
        ({ auth }) =>
          roleHasPublicPrivilegeOrGreater(auth.claims?.role) ||
          this._router.parseUrl("/sign-in?on-sign-in-go-to=" + routerState.url),
      ),
    )
  }
}
