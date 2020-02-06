import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { setUpDevTools } from '@dannymayer/vex'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { environment } from '@funk/ui/web/environments/environment'

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
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
