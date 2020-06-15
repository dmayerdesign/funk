import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { catchError } from "rxjs/operators"

@Component({
  selector: "app-root",
  template: `
    <managed-content-editor>
      <main>
        <ion-router-outlet></ion-router-outlet>
      </main>
    </managed-content-editor>
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
