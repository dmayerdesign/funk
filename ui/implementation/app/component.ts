import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { catchError } from "rxjs/operators"

@Component({
  selector: "app-root",
  template: `
    <ion-app>
      <managed-content-editor>
        <ion-router-outlet></ion-router-outlet>
      </managed-content-editor>
    </ion-app>
  `,
})
export class AppComponent
{
  public constructor(
    private _router: Router
  )
  {
    this._router.events
      .pipe(catchError((error, caught) =>
      {
        console.error(error)
        return caught
      }))
      .subscribe()
  }
}
