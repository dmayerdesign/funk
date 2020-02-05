import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { environment } from '@funk/ui/web/environments/environment'
import { first, map } from 'rxjs/operators'

@Injectable()
export class AdminApi
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
            authorization: await this._identityApi.userIdToken$
              .pipe(map((token) => `Bearer ${token}`), first())
              .toPromise(),
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
            authorization: await this._identityApi.userIdToken$
              .pipe(map((token) => `Bearer ${token}`), first())
              .toPromise(),
          },
        },
      )
      .toPromise()
  }

  public async grantSuperRole(): Promise<void>
  {
    await this._httpClient
      .post<string>(
        `${environment.functionsUrl}/adminGrantSuperRoleToMe`,
        {},
        {
          headers: {
            authorization: await this._identityApi.userIdToken$
              .pipe(map((token) => `Bearer ${token}`), first())
              .toPromise(),
          },
        },
      )
      .toPromise()

    await this._identityApi.sendEmailVerification()
  }
}
