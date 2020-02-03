import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { setUpDevTools } from '@dannymayer/vex'
import { IdentityApi } from '@funk/ui/web/app/identity/api'
import { environment } from '@funk/ui/web/environments/environment'

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav role="navigation">
        <!--this is a place for us to add side-nav code-->
      </mat-sidenav>
      <mat-sidenav-content>
        <!--in here all the content must reside. We will add a navigation header as well-->
        <div fxLayout="row">
          <button (click)="signOut()">Sign out</button>
        </div>
        <main>
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class AppComponent implements OnInit
{
  public title = 'web'

  constructor(
    private _ngZone: NgZone,
    private _identityApi: IdentityApi,
    private _changeDetectorRef: ChangeDetectorRef,
    public router: Router,
  )
  {
    this.router.events.subscribe(() => this._changeDetectorRef.detectChanges())
  }

  public ngOnInit(): void
  {
    if (!environment.production)
    {
      setTimeout(() => this._ngZone.run(() => setUpDevTools()))
    }
  }

  public async signOut(): Promise<void>
  {
    await this._identityApi.signOut()
  }
}
