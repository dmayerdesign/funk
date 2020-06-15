import { Router } from "@angular/router"
import { UserRole } from "@funk/model/auth/user-role"
import { Person } from "@funk/model/identity/person"
import { AdministratorGuard } from "@funk/ui/app/identity/administrator-guard"
import { AuthClient, AuthClientUser } from "@funk/plugins/auth/auth-client"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { Observable } from "rxjs"

export declare const FAKE_USER_UID: string
export declare const FAKE_ID_TOKEN: string

export declare const createUserSession: (role?: UserRole) => Observable<UserSession>
export declare const createFakePerson: (opts?: Partial<Person>) => Person
export declare const createAuthUserStub: (role?: UserRole) => AuthClientUser
export declare const createUserCredentialStub: (
  authUserStub?: AuthClientUser
) => ({
  credential: any
  user: AuthClientUser
})
export declare const createAuthStub: (authUserStub?: AuthClientUser) => AuthClient
export declare const createRouterStub: () => Router
export declare const createStubbedAdministratorGuard: (userRole?: UserRole) => AdministratorGuard
