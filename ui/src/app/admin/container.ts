import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import setSecret from "@funk/api/admin/set-secret"
import getSecret from "@funk/api/admin/get-secret"
import grantSuperRoleToMe from "@funk/api/admin/grant-super-role-to-me"
import { SendEmailVerification } from "@funk/ui/core/identity/actions/send-email-verification"
import { SEND_EMAIL_VERIFICATION } from "@funk/ui/app/identity/tokens"

@Component({
  selector: "admin",
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <managed-content contentId="admin-title"></managed-content>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div>
        <h1>
          <managed-content contentId="admin-set-secret-heading"></managed-content>
        </h1>
        <form [formGroup]="setSecretFormGroup"
          (ngSubmit)="setSecret()">
          <input type="text"
            placeholder="Key"
            formControlName="key"
          />
          <input type="password"
            placeholder="Value"
            formControlName="value"
          />
          <input type="submit"
            [style.visibility]="'hidden'"
          />
        </form>
      </div>
      <div>
        <h1>Get secret</h1>
        <form [formGroup]="getSecretFormGroup"
          (ngSubmit)="getSecret()">
          <input type="text"
            placeholder="Key"
            formControlName="key"
          />
          <input type="submit"
            [style.visibility]="'hidden'"
          />
        </form>
      </div>
      <div>
        <code>{{ secretShowing }}</code>
      </div>
    </ion-content>
  `,
})
export class AdminContainer
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
    @Inject(SEND_EMAIL_VERIFICATION) private _sendEmailVerification: SendEmailVerification
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

    await this._sendEmailVerification()
  }
}
