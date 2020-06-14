import { Component, Inject } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { combineLatest } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { UserSession } from "@funk/ui/core/identity/user-session"

@Component({
  selector: "app-root",
  template: `
    <managed-content-editor>
      <main [ngClass]="{
        'admin-edit-mode-is-on': adminEditModeIsOn | async
      }">
        <ion-router-outlet></ion-router-outlet>
      </main>
    </managed-content-editor>
  `,
})
export class AppComponent
{
  public adminEditModeIsOn = combineLatest(
    this._userSession,
    this._activatedRoute.queryParams)
    .pipe(
      map(([ { auth }, params ]) => roleHasAdminPrivilegeOrGreater(auth.claims.role)
        && params["edit"] === "true"))

  public constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    @Inject(USER_SESSION) private _userSession: UserSession
  )
  {
    this._router.events
      .pipe(catchError((error, caught) =>
      {
        console.error(error)
        return caught
      }))
      .subscribe(x => console.log(x))
  }
}
