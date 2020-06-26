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
  signInWithPopup(provider: AuthProvider): Promise<{ user: AuthClientUser }>
  useDeviceLanguage(): void
  signOut(): Promise<void>
}

export interface AuthClientUser {
  uid: string
  isAnonymous: boolean
  emailVerified: boolean
  getIdTokenResult(): Promise<IdTokenResult>
  getIdToken(forceRefresh?: boolean): Promise<string>
  sendEmailVerification(): Promise<void>
}

export interface AuthProvider {
  providerId: string
}

interface IdTokenResult {
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
  claims: CustomClaims
}
