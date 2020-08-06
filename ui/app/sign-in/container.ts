import { Component, Inject, ViewEncapsulation } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import roleHasPublicPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-public-privilege-or-greater"
import { HOME_RELATIVE_URL } from "@funk/ui/app/atlas/tokens"
import { HomeRelativeUrl } from "@funk/ui/app/atlas/home-relative-url"
import { SIGN_IN_WITH_PROVIDER, SIGN_OUT, USER_SESSION } from
  "@funk/ui/app/identity/tokens"
import { SignInWithProvider } from "@funk/ui/core/identity/behaviors/sign-in-with-provider"
import { SignOut } from "@funk/ui/core/identity/behaviors/sign-out"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { auth } from "firebase/app"
import {  } from "lodash"
import { firstValueFrom } from "rxjs"
import { filter } from "rxjs/operators"

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
    @Inject(USER_SESSION) private _userSession: UserSession,
    @Inject(SIGN_OUT) private _signOut: SignOut,
    @Inject(HOME_RELATIVE_URL) private _home: HomeRelativeUrl,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  )
  { }

  public async signInWithGoogle(): Promise<void>
  {
    const provider = new auth.GoogleAuthProvider()
    const queryParams = await firstValueFrom(this._activatedRoute.queryParams)
    const onSignInGoTo = queryParams["on-sign-in-go-to"]

    await this._signInWithProvider(provider)
    await firstValueFrom(this._userSession.pipe(
      filter((session) => roleHasPublicPrivilegeOrGreater(session.auth.claims.role))))

    await this._router.navigateByUrl(onSignInGoTo ?? await this._home())
  }

  public async signOut(): Promise<void>
  {
    this._signOut()
  }
}
