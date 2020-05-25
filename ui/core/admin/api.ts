import { Inject, Injectable } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import getSecret from "@funk/api/admin/get-secret"
import grantSuperRoleToMe from "@funk/api/admin/grant-super-role-to-me"
import setSecret from "@funk/api/admin/set-secret"
import { Identity, IDENTITY } from "@funk/ui/core/identity/interface"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"

@Injectable()
export class AdminApi
{
  public secretShowing = ""
  public setSecretFormGroup = new FormGroup({
    key: new FormControl(),
    value: new FormControl(),
  })
  public getSecretFormGroup = new FormGroup({
    key: new FormControl(),
  })

  public constructor(
    private _functionsClient: FunctionsClient,
    @Inject(IDENTITY) private _identityApi: Identity
  )
  { }

  public async setSecret(): Promise<void>
  {
    await this._functionsClient.rpcAuthorized<typeof setSecret>(
      "adminSetSecret",
      this.setSecretFormGroup.value
    )
  }

  public async getSecret(): Promise<void>
  {
    this.secretShowing = await this._functionsClient.rpcAuthorized<typeof getSecret>(
      "adminGetSecret",
      this.getSecretFormGroup.value.key
    ) ?? ""
  }

  public async grantSuperRole(): Promise<void>
  {
    await this._functionsClient.rpc<typeof grantSuperRoleToMe>(
      "adminGrantSuperRoleToMe")

    await this._identityApi.sendEmailVerification()
  }
}
