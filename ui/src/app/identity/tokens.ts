import { InjectionToken } from "@angular/core"
import { CreateUserWithEmailAndPassword } from
  "@funk/ui/app/identity/actions/create-user-with-email-and-password"
import { Initialize } from "@funk/ui/app/identity/actions/initialize"
import { SendEmailVerification } from "@funk/ui/app/identity/actions/send-email-verification"
import { SignInWithEmailAndPassword } from
  "@funk/ui/app/identity/actions/sign-in-with-email-and-password"
import { SignOut } from "@funk/ui/app/identity/actions/sign-out"
import { UserSession } from "@funk/ui/app/identity/user-session"
import { UserIdToken } from "@funk/ui/app/identity/user-id-token"
import { UserState } from "@funk/ui/app/identity/user-state"

export const CREATE_USER_WITH_EMAIL_AND_PASSWORD =
  new InjectionToken<CreateUserWithEmailAndPassword>("CREATE_USER_WITH_EMAIL_AND_PASSWORD")
export const INITIALIZE = new InjectionToken<Initialize>("INITIALIZE")
export const SEND_EMAIL_VERIFICATION =
  new InjectionToken<SendEmailVerification>("SEND_EMAIL_VERIFICATION")
export const SIGN_IN_WITH_EMAIL_AND_PASSWORD =
  new InjectionToken<SignInWithEmailAndPassword>("SIGN_IN_WITH_EMAIL_AND_PASSWORD")
export const SIGN_OUT = new InjectionToken<SignOut>("SIGN_OUT")
export const USER_SESSION = new InjectionToken<UserSession>("USER_SESSION")
export const USER_ID_TOKEN = new InjectionToken<UserIdToken>("USER_ID_TOKEN")
export const USER_STATE = new InjectionToken<UserState>("USER_STATE")