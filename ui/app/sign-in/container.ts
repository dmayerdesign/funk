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
import { from } from "rxjs"
import { filter, first, switchMap, pluck } from "rxjs/operators"
import { UntilDestroy } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: "sign-in",
  styleUrls: [ "./sign-in.scss" ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="sign-in-inner">
      <button
        class="
          sign-in-with-google-button
          ion-activatable ripple-parent
        "
        (click)="signInWithGoogle()">
        <img slot="icon-only"
          src="assets/auth/2x/btn_google_signin_dark_normal_web@2x.png"
        />
      </button>

      <ion-button
        class="sign-out-button"
        size="small"
        expand="block"
        fill="clear"
        [style.margin-top]="'20px'"
        (click)="signOut()">
        Sign Out
      </ion-button>
    </div>
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

    await this._signInWithProvider(provider)

    from(this._signInWithProvider(provider))
      .pipe(
        switchMap(() => this._userSession),
        filter((session) => roleHasPublicPrivilegeOrGreater(session.auth.claims.role)),
        first(),
        switchMap(() => this._activatedRoute.queryParams
          .pipe(
            first(),
            pluck("on-sign-in-go-to"))),
        switchMap((onSignInGoTo) => !!onSignInGoTo ? Promise.resolve(onSignInGoTo) : this._home()),
        switchMap(
          (targetUrl) => this._router.navigateByUrl(targetUrl)
        ))
      .subscribe()
  }

  public async signOut(): Promise<void>
  {
    this._signOut()
  }
}
