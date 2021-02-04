import { APP_INITIALIZER, NgModule } from "@angular/core"
import {
  AngularFireAuth,
  AuthClientForTesting,
} from "@funk/auth/plugins/external/auth-client"
import { INTEGRATION_TEST } from "@funk/configuration"
import { construct as constructCreateUserWithEmailAndPassword } from "@funk/identity/application/external/behaviors/create-user-with-email-and-password"
import { construct as constructInitialize } from "@funk/identity/application/external/behaviors/initialize"
import { construct as constructSendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"
import { construct as constructSignInWithEmailAndPassword } from "@funk/identity/application/external/behaviors/sign-in-with-email-and-password"
import { construct as constructSignInWithProvider } from "@funk/identity/application/external/behaviors/sign-in-with-provider"
import { construct as constructSignOut } from "@funk/identity/application/external/behaviors/sign-out"
import { construct as constructUserIdToken } from "@funk/identity/application/external/user-id-token"
import { construct as constructUserSession } from "@funk/identity/application/external/user-session"
import { construct as constructUserState } from "@funk/identity/application/external/user-state"
import {
  AUTH_CLIENT,
  CREATE_USER_WITH_EMAIL_AND_PASSWORD,
  INITIALIZE,
  SEND_EMAIL_VERIFICATION,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  SIGN_IN_WITH_PROVIDER,
  SIGN_OUT,
  USER_ID_TOKEN,
  USER_SESSION,
  USER_STATE,
} from "@funk/identity/infrastructure/external/tokens"
import { LISTEN_BY_ID } from "@funk/persistence/infrastructure/external/tokens"

/**
 * This module should only be imported in the root app module.
 */
@NgModule({
  providers: [
    {
      provide: AUTH_CLIENT,
      useExisting: INTEGRATION_TEST ? AuthClientForTesting : AngularFireAuth,
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