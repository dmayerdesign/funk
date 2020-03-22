import { Component } from '@angular/core'
import { AdminApi } from '@funk/ui/core/admin/api'

@Component({
  selector: 'admin',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <managed-content contentId="test-cms-doc"></managed-content>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <div>
      <h1>
        <managed-content contentId="test-cms-doc-2"></managed-content>
      </h1>
      <form [formGroup]="adminApi.setSecretFormGroup"
        (ngSubmit)="adminApi.setSecret()">
        <input type="text"
          placeholder="Key"
          formControlName="secretKey"
        />
        <input type="password"
          placeholder="Value"
          formControlName="secretValue"
        />
        <input type="submit"
          [style.visibility]="'hidden'"
        />
      </form>
    </div>
    <div>
      <h1>Get secret</h1>
      <form [formGroup]="adminApi.getSecretFormGroup"
        (ngSubmit)="adminApi.getSecret()">
        <input type="text"
          placeholder="Key"
          formControlName="secretKey"
        />
        <input type="submit"
          [style.visibility]="'hidden'"
        />
      </form>
    </div>
    <div>
      <code>{{ adminApi.secretShowing }}</code>
    </div>
    <button (click)="adminApi.grantSuperRole()">Grant</button>
  `,
  providers: [ AdminApi ],
})
export class AdminContainer
{
  constructor(
    public adminApi: AdminApi,
  )
  { }
}
