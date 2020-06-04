import { Component, Inject } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { combineLatest } from "rxjs"
import { map } from "rxjs/operators"
import { USER_SESSION } from "@funk/ui/core/identity/tokens"
import UserSession from "@funk/ui/core/identity/user-session"

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
    @Inject(USER_SESSION) private _userSession: UserSession
  ) { }
}
