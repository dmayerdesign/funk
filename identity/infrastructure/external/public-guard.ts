import { Inject, Injectable } from "@angular/core"
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router"
import roleHasAdminPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-admin-privilege-or-greater"
import { UserSession } from "@funk/identity/application/external/user-session"
import { AnonymousGuard } from "@funk/identity/infrastructure/external/anonymous-guard"
import { USER_SESSION } from "@funk/identity/infrastructure/external/tokens"
import { Observable, of } from "rxjs"
import { map, switchMap } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class PublicGuard implements CanActivate {
  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    private _anonymousGuard: AnonymousGuard,
    private _router: Router,
  ) {}

  public canActivate(
    ...params: [ActivatedRouteSnapshot, RouterStateSnapshot]
  ): Observable<true | UrlTree> {
    return this._anonymousGuard.canActivate(...params).pipe(
      switchMap((canActivate) => {
        if (canActivate === true) {
          return this._userSession.pipe(
            map(
              ({ auth }) =>
                roleHasAdminPrivilegeOrGreater(auth.claims.role) ||
                this._router.parseUrl("/not-found"),
            ),
          )
        }
        return of(canActivate)
      }),
    )
  }
}
