import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { construct as constructGrantSuperRole } from
  "@funk/ui/functions/admin/grant-super-role-to-me"
import { construct as constructGetSecret } from "@funk/ui/functions/admin/get-secret"
import { construct as constructSetSecret } from "@funk/ui/functions/admin/set-secret"
import { SendEmailVerification } from "@funk/ui/core/identity/actions/send-email-verification"
import { SEND_EMAIL_VERIFICATION } from "@funk/ui/app/identity/tokens"
import { GRANT_SUPER_ROLE_TO_ME, GET_SECRET, SET_SECRET } from "@funk/ui/app/admin/tokens"
import { Platform } from "@ionic/angular"

@Component({
  selector: "admin",
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <managed-content contentId="app-title"></managed-content>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div>
        <h1>
          Set Secret
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
        <div>
          <code>{{ secretShowing }}</code>
        </div>
      </div>
      <div *ngIf="allowUploadSkus">
        <h1>Upload Skus</h1>
        <import-skus></import-skus>
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
  public allowUploadSkus = this._platform.platforms().includes("desktop")

  public constructor(
    @Inject(GRANT_SUPER_ROLE_TO_ME)
    private _grantSuperRole: ReturnType<typeof constructGrantSuperRole>,

    @Inject(GET_SECRET) private _getSecret: ReturnType<typeof constructGetSecret>,

    @Inject(SET_SECRET) private _setSecret: ReturnType<typeof constructSetSecret>,

    @Inject(SEND_EMAIL_VERIFICATION) private _sendEmailVerification: SendEmailVerification,

    private _platform: Platform
  )
  {
    console.log(this._platform.platforms())
  }

  public async setSecret(): Promise<void>
  {
    await this._setSecret(this.setSecretFormGroup.value)
  }

  public async getSecret(): Promise<void>
  {
    this.secretShowing = await this._getSecret(
      this.getSecretFormGroup.value.key
    ) ?? ""
  }

  public async grantSuperRole(): Promise<void>
  {
    await this._grantSuperRole()

    await this._sendEmailVerification()
  }
}
