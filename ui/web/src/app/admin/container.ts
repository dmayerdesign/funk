import { Component } from '@angular/core'
import { AdminApi } from '@funk/ui/core/admin/api'
import { StoreApi } from '@funk/ui/core/store/api'
import { map } from 'rxjs/operators'

@Component({
  selector: 'admin',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <managed-content
          [collectionPath]="'sandbox'"
          [documentPath]="'test-cms-doc'">
          <ion-title>
            {{ title$ | async }}
          </ion-title>
        </managed-content>
      </ion-toolbar>
    </ion-header>
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
  public title$ = this._storeApi.getDocumentValueChanges('sandbox', 'test-cms-doc')
    .pipe(map((contentData: any) => contentData && contentData.value))

  constructor(
    public adminApi: AdminApi,
    private _storeApi: StoreApi,
  )
  { }
}
