import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'

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
    @Inject(IdentityApi) private _identityApi: Identity,
    private _changeDetectorRef: ChangeDetectorRef,
    public router: Router,
  )
  {
    this.router.events.subscribe(() => this._changeDetectorRef.detectChanges())
  }

  public ngOnInit(): void
  { }

  public async signOut(): Promise<void>
  {
    await this._identityApi.signOut()
  }
}
