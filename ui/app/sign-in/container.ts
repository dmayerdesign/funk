import { Component, Inject, ViewEncapsulation } from "@angular/core"
import { SIGN_IN_WITH_PROVIDER, SIGN_OUT } from
  "@funk/ui/app/identity/tokens"
import { SignInWithProvider } from "@funk/ui/core/identity/actions/sign-in-with-provider"
import { SignOut } from "@funk/ui/core/identity/actions/sign-out"
import { auth } from "firebase/app"

@Component({
  selector: "sign-in",
  styleUrls: [ "./sign-in.scss" ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ion-button class="ion-no-margin"
      expand="block"
      size="default"
      (click)="signInWithGoogle()">
      Sign In With Google
    </ion-button>
    <ion-button (click)="signOut()">Sign Out</ion-button>
  `,
})
export class SignInContainer
{
  public constructor(
    @Inject(SIGN_IN_WITH_PROVIDER) private _signInWithProvider: SignInWithProvider,
    @Inject(SIGN_OUT) private _signOut: SignOut
  )
  { }

  public async signInWithGoogle(): Promise<void>
  {
    const provider = new auth.GoogleAuthProvider()
    this._signInWithProvider(provider)
  }

  public async signOut(): Promise<void>
  {
    this._signOut()
  }
}
