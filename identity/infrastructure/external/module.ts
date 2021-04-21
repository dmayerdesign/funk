import { APP_INITIALIZER, NgModule } from "@angular/core"
import { AngularFireAuth } from "@funk/auth/plugins/external/auth-client"
import { INTEGRATION_TEST } from "@funk/configuration"
import { AuthClientForTesting } from "@funk/identity/application/external/auth-client-for-testing"
import { construct as constructCreateUserWithEmailAndPassword } from "@funk/identity/application/external/behaviors/create-user-with-email-and-password"
import { construct as constructInitialize } from "@funk/identity/application/external/behaviors/initialize"
import { construct as constructSendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"
import { construct as constructSignInWithEmailAndPassword } from "@funk/identity/application/external/behaviors/sign-in-with-email-and-password"
import { construct as constructSignInWithProvider } from "@funk/identity/application/external/behaviors/sign-in-with-provider"
import { construct as constructSignOut } from "@funk/identity/application/external/behaviors/sign-out"
import { construct as constructUserContent } from "@funk/identity/application/external/user-content"
import { construct as constructUserIdToken } from "@funk/identity/application/external/user-id-token"
import { construct as constructUserSession } from "@funk/identity/application/external/user-session"
import {
  AUTH_CLIENT,
  CREATE_USER_WITH_EMAIL_AND_PASSWORD,
  INITIALIZE,
  SEND_EMAIL_VERIFICATION,
  SIGN_IN_WITH_EMAIL_AND_PASSWORD,
  SIGN_IN_WITH_PROVIDER,
  SIGN_OUT,
  USER_CONTENT,
  USER_ID_TOKEN,
  USER_SESSION,
} from "@funk/identity/infrastructure/external/tokens"
import { PersonPersistenceModule } from "@funk/identity/person/infrastructure/external/persistence/module"
import { LISTEN_FOR_PERSON_BY_ID } from "@funk/identity/person/infrastructure/external/persistence/tokens"
import { UserContentPersistenceModule } from "@funk/identity/user-content/infrastructure/external/persistence/module"
import { LISTEN_FOR_USER_CONTENT_BY_ID } from "@funk/identity/user-content/infrastructure/external/persistence/tokens"

/**
 * This module should only be imported in the root app module.
 */
@NgModule({
  imports: [
    UserContentPersistenceModule.withProviders(),
    PersonPersistenceModule.withProviders(),
  ],
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
      deps: [AUTH_CLIENT, LISTEN_FOR_PERSON_BY_ID],
    },
    {
      provide: USER_CONTENT,
      useFactory: constructUserContent,
      deps: [AUTH_CLIENT, LISTEN_FOR_USER_CONTENT_BY_ID],
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
