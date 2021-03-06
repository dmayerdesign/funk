import { InjectionToken } from "@angular/core"
import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { CreateUserWithEmailAndPassword } from "@funk/identity/application/external/behaviors/create-user-with-email-and-password"
import { Initialize } from "@funk/identity/application/external/behaviors/initialize"
import { SendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"
import { SignInWithEmailAndPassword } from "@funk/identity/application/external/behaviors/sign-in-with-email-and-password"
import { SignInWithProvider } from "@funk/identity/application/external/behaviors/sign-in-with-provider"
import { SignOut } from "@funk/identity/application/external/behaviors/sign-out"
import { UserContent$ } from "@funk/identity/application/external/user-content"
import { UserIdToken } from "@funk/identity/application/external/user-id-token"
import { UserSession } from "@funk/identity/application/external/user-session"

export const CREATE_USER_WITH_EMAIL_AND_PASSWORD = new InjectionToken<
  CreateUserWithEmailAndPassword
>("CREATE_USER_WITH_EMAIL_AND_PASSWORD")
export const INITIALIZE = new InjectionToken<Initialize>("INITIALIZE")
export const SEND_EMAIL_VERIFICATION = new InjectionToken<
  SendEmailVerification
>("SEND_EMAIL_VERIFICATION")
export const SIGN_IN_WITH_EMAIL_AND_PASSWORD = new InjectionToken<
  SignInWithEmailAndPassword
>("SIGN_IN_WITH_EMAIL_AND_PASSWORD")
export const SIGN_IN_WITH_PROVIDER = new InjectionToken<SignInWithProvider>(
  "SIGN_IN_WITH_PROVIDER",
)
export const SIGN_OUT = new InjectionToken<SignOut>("SIGN_OUT")
export const USER_SESSION = new InjectionToken<UserSession>("USER_SESSION")
export const USER_ID_TOKEN = new InjectionToken<UserIdToken>("USER_ID_TOKEN")
export const USER_CONTENT = new InjectionToken<UserContent$>("USER_CONTENT")
export const AUTH_CLIENT = new InjectionToken<AuthClient>("AUTH_CLIENT")
