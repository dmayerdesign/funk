import { APP_INITIALIZER, NgModule } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { construct as constructCreateUserWithEmailAndPassword } from "@funk/ui/core/identity/behaviors/create-user-with-email-and-password"
import { construct as constructInitialize } from "@funk/ui/core/identity/behaviors/initialize"
import { construct as constructSendEmailVerification } from "@funk/ui/core/identity/behaviors/send-email-verification"
import { construct as constructSignInWithEmailAndPassword } from "@funk/ui/core/identity/behaviors/sign-in-with-email-and-password"
import { construct as constructSignInWithProvider } from "@funk/ui/core/identity/behaviors/sign-in-with-provider"
import { construct as constructSignOut } from "@funk/ui/core/identity/behaviors/sign-out"
import { construct as constructUserSession } from "@funk/ui/core/identity/user-session"
import { construct as constructUserIdToken } from "@funk/ui/core/identity/user-id-token"
import { construct as constructUserState } from "@funk/ui/core/identity/user-state"
import { LISTEN_BY_ID } from "@funk/ui/app/persistence/tokens"
import {
  CREATE_USER_WITH_EMAIL_AND_PASSWORD,
  INITIALIZE,
  SEND_EMAIL_VERIFICATION,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  SIGN_IN_WITH_PROVIDER,
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
  providers: [
    {
      provide: AUTH_CLIENT,
      useExisting: AngularFireAuth,
    },
    {
      provide: SEND_EMAIL_VERIFICATION,
      useFactory: constructSendEmailVerification,
      deps: [AUTH_CLIENT],
    },
    {
      provide: SIGN_IN_WITH_EMAIL_AND_PASSWORD,
      useFactory: constructSignInWithEmailAndPassword,
      deps: [AUTH_CLIENT],
    },
    {
      provide: SIGN_IN_WITH_PROVIDER,
      useFactory: constructSignInWithProvider,
      deps: [AUTH_CLIENT, SEND_EMAIL_VERIFICATION],
    },
    {
      provide: SIGN_OUT,
      useFactory: constructSignOut,
      deps: [AUTH_CLIENT],
    },
    {
      provide: USER_ID_TOKEN,
      useFactory: constructUserIdToken,
      deps: [AUTH_CLIENT],
    },
    {
      provide: CREATE_USER_WITH_EMAIL_AND_PASSWORD,
      useFactory: constructCreateUserWithEmailAndPassword,
      deps: [AUTH_CLIENT, SEND_EMAIL_VERIFICATION],
    },
    {
      provide: USER_SESSION,
      useFactory: constructUserSession,
      deps: [AUTH_CLIENT, LISTEN_BY_ID],
    },
    {
      provide: USER_STATE,
      useFactory: constructUserState,
      deps: [AUTH_CLIENT, LISTEN_BY_ID],
    },
    {
      provide: INITIALIZE,
      useFactory: constructInitialize,
      deps: [AUTH_CLIENT, USER_SESSION, USER_ID_TOKEN],
    },
    {
      provide: APP_INITIALIZER,
      useExisting: INITIALIZE,
      multi: true,
    },
  ],
})
export class IdentityModule {}
