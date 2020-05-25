import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { Identity, IDENTITY } from "@funk/ui/core/identity/interface"

@Component({
  selector: "sign-up",
  template: `
    <h2>Sign In</h2>
    <form [formGroup]="signInFormGroup"
      (ngSubmit)="handleSignInSubmit()"
      fxLayout fxLayoutGap="10px">
      <input formControlName="email" placeholder="email" type="email" />
      <input formControlName="password" placeholder="password" type="password" />
      <input type="submit" style="visibility: hidden" />
    </form>

    <h2>Sign Up</h2>
    <form [formGroup]="signUpFormGroup"
      (ngSubmit)="handleSignUpSubmit()"
      fxLayout fxLayoutGap="10px">
      <input formControlName="email" placeholder="email" type="email" />
      <input formControlName="password" placeholder="password" type="password" />
      <input type="submit" style="visibility: hidden" />
    </form>
  `,
})
export class SignUpComponent
{
  public signUpFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })
  public signInFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  public constructor(
    @Inject(IDENTITY) private _identityApi: Identity
  )
  { }

  public async handleSignUpSubmit(): Promise<void>
  {
    await this._identityApi.createUserWithEmailAndPassword(
      this.signUpFormGroup.get("email")!.value,
      this.signUpFormGroup.get("password")!.value
    )
  }

  public async handleSignInSubmit(): Promise<void>
  {
    await this._identityApi.signInWithEmailAndPassword(
      this.signInFormGroup.get("email")!.value,
      this.signInFormGroup.get("password")!.value
    )
  }
}
