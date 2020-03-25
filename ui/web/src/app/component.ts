import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { setUpDevTools } from '@dannymayer/vex'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { environment } from '@funk/ui/web/environments/environment'

@Component({
  selector: 'app-root',
  template: `
  <managed-content-editor>
    <main class="admin-edit-mode-is-on">
      <ion-router-outlet></ion-router-outlet>
    </main>
  </managed-content-editor>
  `,
})
export class AppComponent implements OnInit
{
  constructor(
    private _ngZone: NgZone,
    @Inject(IdentityApi) private _identityApi: Identity,
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
