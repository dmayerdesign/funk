import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { first, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { IdentityApi } from '../identity/api'

@Component({
  selector: 'admin',
  template: `
    <div>
      <h1>Set secret</h1>
      <form [formGroup]="setSecretFormGroup"
        (ngSubmit)="setSecret()"
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
      <form [formGroup]="getSecretFormGroup"
        (ngSubmit)="getSecret()"
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
      <code>{{ secretShowing }}</code>
    </div>
    <button (click)="grantSuperRole()">Grant</button>
  `,
})
export class AdminContainer
{
  public secretShowing = ''
  public setSecretFormGroup = new FormGroup({
    secretKey: new FormControl(),
    secretValue: new FormControl(),
  })
  public getSecretFormGroup = new FormGroup({
    secretKey: new FormControl(),
  })

  constructor(
    private _httpClient: HttpClient,
    private _identityApi: IdentityApi,
  )
  { }

  public async setSecret(): Promise<void>
  {
    await this._httpClient
      .post(
        `${environment.functionsUrl}/adminSetSecret`,
        this.setSecretFormGroup.value,
        {
          headers: {
            authorization: await this._identityApi.firebaseIdToken$
              .pipe(map((token) => `Bearer ${token}`), first())
              .toPromise()
          },
        },
      )
      .toPromise()
  }

  public async getSecret(): Promise<void>
  {
    this.secretShowing = await this._httpClient
      .post<string>(
        `${environment.functionsUrl}/adminGetSecret`,
        this.getSecretFormGroup.value,
        {
          headers: {
            authorization: await this._identityApi.firebaseIdToken$
              .pipe(map((token) => `Bearer ${token}`), first())
              .toPromise()
          },
        },
      )
      .toPromise()
  }

  public async grantSuperRole(): Promise<void>
  {
    await this._httpClient
      .post(`${environment.functionsUrl}/adminGrantSuperRole`, {})
      .toPromise()
  }
}
