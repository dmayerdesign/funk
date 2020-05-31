import { Component, Inject } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { IDENTITY, Identity } from "@funk/ui/core/identity/interface"
import { combineLatest } from "rxjs"
import { map } from "rxjs/operators"

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
    this._identity.userRole$,
    this._activatedRoute.queryParams)
    .pipe(
      map(([ role, params ]) => role
        && roleHasAdminPrivilegeOrGreater(role)
        && params["edit"] === "true"))

  public constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(IDENTITY) private _identity: Identity
  ) { }
}
