import { APP_INITIALIZER, NgModule } from "@angular/core"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { AngularFireAuth } from "@angular/fire/auth"
import { construct as constructCreateUserWithEmailAndPassword} from
  "@funk/ui/app/identity/actions/create-user-with-email-and-password"
import { construct as constructInitialize} from "@funk/ui/app/identity/actions/initialize"
import { construct as constructSendEmailVerification} from
  "@funk/ui/app/identity/actions/send-email-verification"
import { construct as constructSignInWithEmailAndPassword} from
  "@funk/ui/app/identity/actions/sign-in-with-email-and-password"
import { construct as constructSignOut} from "@funk/ui/app/identity/actions/sign-out"
import { construct as constructUserSession} from "@funk/ui/app/identity/user-session"
import { construct as constructUserIdToken} from "@funk/ui/app/identity/user-id-token"
import { construct as constructUserState} from "@funk/ui/app/identity/user-state"
import { LISTEN_BY_ID } from "@funk/ui/app/persistence/tokens"
import {
  CREATE_USER_WITH_EMAIL_AND_PASSWORD,
  INITIALIZE,
  SEND_EMAIL_VERIFICATION,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  SIGN_OUT,
  USER_SESSION,
  USER_ID_TOKEN,
  USER_STATE,
  AUTH_CLIENT,
} from "@funk/ui/app/identity/tokens"

/**
 * This module should only be imported in the root module.
 */
@NgModule({
  imports: [ AppFireModule ],
  providers: [
    {
      provide: AUTH_CLIENT,
      useExisting: AngularFireAuth,
    },
    {
      provide: SEND_EMAIL_VERIFICATION,
      useFactory: constructSendEmailVerification,
      deps: [ AUTH_CLIENT ],
    },
    {
      provide: SIGN_IN_WITH_EMAIL_AND_PASSWORD,
      useFactory: constructSignInWithEmailAndPassword,
      deps: [ AUTH_CLIENT ],
    },
    {
      provide: SIGN_OUT,
      useFactory: constructSignOut,
      deps: [ AUTH_CLIENT ],
    },
    {
      provide: USER_ID_TOKEN,
      useFactory: constructUserIdToken,
      deps: [ AUTH_CLIENT ],
    },
    {
      provide: CREATE_USER_WITH_EMAIL_AND_PASSWORD,
      useFactory: constructCreateUserWithEmailAndPassword,
      deps: [ AUTH_CLIENT, SEND_EMAIL_VERIFICATION ],
    },
    {
      provide: USER_SESSION,
      useFactory: constructUserSession,
      deps: [ AUTH_CLIENT, LISTEN_BY_ID ],
    },
    {
      provide: USER_STATE,
      useFactory: constructUserState,
      deps: [ AUTH_CLIENT, LISTEN_BY_ID ],
    },
    {
      provide: INITIALIZE,
      useFactory: constructInitialize,
      deps: [ AUTH_CLIENT, USER_SESSION, USER_ID_TOKEN ],
    },
    {
      provide: APP_INITIALIZER,
      useExisting: INITIALIZE,
      multi: true,
    },
  ],
})
export class IdentityModule
{ }
