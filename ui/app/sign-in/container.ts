import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { asPromise } from "@funk/helpers/as-promise"
import roleHasPublicPrivilegeOrGreater from "@funk/model/auth/helpers/role-has-public-privilege-or-greater"
import { HOME_RELATIVE_URL } from "@funk/ui/app/atlas/tokens"
import {
  SIGN_IN_WITH_PROVIDER,
  SIGN_OUT,
  USER_SESSION,
} from "@funk/ui/app/identity/tokens"
import { HomeRelativeUrl } from "@funk/ui/core/atlas/home-relative-url"
import { SignInWithProvider } from "@funk/ui/core/identity/behaviors/sign-in-with-provider"
import { SignOut } from "@funk/ui/core/identity/behaviors/sign-out"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { auth } from "firebase/app"
import { filter, first, pluck, switchMap } from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: "sign-in",
  styleUrls: ["./sign-in.scss"],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="sign-in-inner">
      <button
        class="
          sign-in-with-google-button
          ion-activatable ripple-parent
        "
        (click)="signInWithGoogle()"
      >
        <img
          slot="icon-only"
          src="assets/auth/2x/btn_google_signin_dark_normal_web@2x.png"
        />
      </button>

      <ion-button
        class="button sign-out-button"
        size="small"
        expand="block"
        fill="clear"
        [style.margin-top]="'20px'"
        (click)="signOut()"
      >
        Sign Out
      </ion-button>
    </div>
  `,
})
export class SignInContainer implements OnInit {
  public constructor(
    @Inject(SIGN_IN_WITH_PROVIDER)
    private _signInWithProvider: SignInWithProvider,
    @Inject(USER_SESSION) private _userSession: UserSession,
    @Inject(SIGN_OUT) private _signOut: SignOut,
    @Inject(HOME_RELATIVE_URL) private _home: HomeRelativeUrl,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  public async ngOnInit(): Promise<void> {}

  public async signInWithGoogle(): Promise<void> {
    const provider = new auth.GoogleAuthProvider()

    await this._signInWithProvider(provider)
    await this._redirectAfterSignIn()
  }

  public async signOut(): Promise<void> {
    this._signOut()
  }

  private async _redirectAfterSignIn(): Promise<void> {
    await asPromise(
      this._userSession.pipe(
        filter((session) =>
          roleHasPublicPrivilegeOrGreater(session.auth.claims.role),
        ),
        first(),
        switchMap(() =>
          this._activatedRoute.queryParams.pipe(
            first(),
            pluck("on-sign-in-go-to"),
          ),
        ),
        switchMap((onSignInGoTo) =>
          !!onSignInGoTo ? Promise.resolve(onSignInGoTo) : this._home(),
        ),
        untilDestroyed(this),
        switchMap((targetUrl) => this._router.navigateByUrl(targetUrl)),
      ),
    )
  }
}
