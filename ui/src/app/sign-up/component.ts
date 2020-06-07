import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup } from "@angular/forms"
import { CreateUserWithEmailAndPassword } from
  "@funk/ui/app/identity/actions/create-user-with-email-and-password"
import { SIGN_IN_WITH_EMAIL_AND_PASSWORD, CREATE_USER_WITH_EMAIL_AND_PASSWORD } from
  "@funk/ui/app/identity/tokens"
import { SignInWithEmailAndPassword } from
  "@funk/ui/app/identity/actions/sign-in-with-email-and-password"

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
    @Inject(CREATE_USER_WITH_EMAIL_AND_PASSWORD)
    private _createUser: CreateUserWithEmailAndPassword,

    @Inject(SIGN_IN_WITH_EMAIL_AND_PASSWORD) private _signIn: SignInWithEmailAndPassword
  )
  { }

  public async handleSignUpSubmit(): Promise<void>
  {
    await this._createUser(
      this.signUpFormGroup.get("email")!.value,
      this.signUpFormGroup.get("password")!.value
    )
  }

  public async handleSignInSubmit(): Promise<void>
  {
    await this._signIn(
      this.signInFormGroup.get("email")!.value,
      this.signInFormGroup.get("password")!.value
    )
  }
}
