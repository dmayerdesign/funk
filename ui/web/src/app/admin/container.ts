import { Component } from '@angular/core'
import { AdminApi } from '@funk/ui/core/admin/api'

@Component({
  selector: 'admin',
  template: `
    <div>
      <h1>Set secret</h1>
      <form [formGroup]="adminApi.setSecretFormGroup"
        (ngSubmit)="adminApi.setSecret()"
        fxLayout="row"
        fxLayoutGap="10px">
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
        (ngSubmit)="adminApi.getSecret()"
        fxLayout="row"
        fxLayoutGap="10px">
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
    public adminApi: AdminApi
  )
  { }
}
