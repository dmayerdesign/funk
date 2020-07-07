import { Component, Input, Output, EventEmitter, Inject } from "@angular/core"
import { FormGroup } from "@angular/forms"
import { Login } from "@funk/model/auth/login"
import { IonNav } from "@ionic/angular"

@Component({
  selector: "sign-up-form",
  styles: [`
    .back-to-sign-in {
      align-self: flex-start;
    }
  `],
  template: `
    <div class="sign-in-inner">
      <h2>Sign Up</h2>
      <form [formGroup]="signUpFormGroup"
        (ngSubmit)="handleSubmit()">
        <ion-list class="ion-no-margin ion-no-padding"
          lines="full">
          <ion-item>
            <ion-label position="stacked">
              Email Address
            </ion-label>
            <ion-input formControlName="email"
              placeholder="email"
              type="email">
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">
              Password
            </ion-label>
            <ion-input formControlName="password"
              placeholder="password"
              type="password">
            </ion-input>
          </ion-item>

        </ion-list>

        <ion-button class="ion-no-margin"
          expand="block"
          size="default"
          type="submit">
          Create Account
        </ion-button>

        <!--
        <ion-button class="go-to-sign-up ion-no-margin"
          type="button"
          size="small"
          fill="clear"
          (click)="goToSignIn()">
          <ion-text color="blue">I already have an account</ion-text>
        </ion-button>
        -->
      </form>
    </div>
  `,
})
export class SignUpFormComponent
{
  @Input() public signUpFormGroup!: FormGroup
  @Output() public signUpFormSubmit = new EventEmitter<Login>()

  public constructor(
    @Inject(IonNav) public ionNav: IonNav
  )
  { }

  public async handleSubmit(): Promise<void>
  {
    this.signUpFormSubmit.emit(this.signUpFormGroup.value)
  }
}
