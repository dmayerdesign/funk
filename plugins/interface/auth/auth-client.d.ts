import { CustomClaims } from "@funk/model/auth/custom-claims"
import { Observable } from "rxjs"

export interface AuthClient {
  user: Observable<AuthClientUser>
  idTokenResult: Observable<IdTokenResult | null>
  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any>
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any>
  signInAnonymously(): Promise<any>
  signOut(): Promise<void>
}

export interface AuthClientUser {
  uid: string
  getIdTokenResult(): IdTokenResult
  getIdToken(forceRefresh?: boolean): Promise<string>
  sendEmailVerification(): Promise<void>
  isAnonymous: boolean
}

interface IdTokenResult {
  /**
   * The Firebase Auth ID token JWT string.
   */
  token: string
  /**
   * The ID token expiration time formatted as a UTC string.
   */
  expirationTime: string
  /**
   * The authentication time formatted as a UTC string. This is the time the
   * user authenticated (signed in) and not the time the token was refreshed.
   */
  authTime: string
  /**
   * The ID token issued at time formatted as a UTC string.
   */
  issuedAtTime: string
  /**
   * The sign-in provider through which the ID token was obtained (anonymous,
   * custom, phone, password, etc). Note, this does not map to provider IDs.
   */
  signInProvider: string | null
  /**
   * The type of second factor associated with this session, provided the user
   * was multi-factor authenticated (eg. phone, etc).
   */
  signInSecondFactor: string | null
  /**
   * The entire payload claims of the ID token including the standard reserved
   * claims as well as the custom claims.
   */
  claims: CustomClaims
}
