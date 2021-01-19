import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { UserRole } from "@funk/model/auth/user-role"
import { createAuthClientStub, createAuthUserStub } from "@funk/ui/core/identity/stubs"
import { auth, User } from "firebase/app"
import { Observable } from "rxjs"

export interface AbstractAuthClient {
  user: Observable<User | null>
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<auth.UserCredential>
  signInWithEmailAndPassword: (email: string, password: string) => Promise<auth.UserCredential>
  signOut: () => Promise<void>
  signInAnonymously: () => Promise<auth.UserCredential>
  signInWithPopup: (provider: auth.AuthProvider) => Promise<auth.UserCredential>
  useDeviceLanguage: () => Promise<void>
  currentUser: Promise<User | null>
  authState: Observable<User | null>
  idTokenResult: Observable<auth.IdTokenResult | null>
}

@Injectable({ providedIn: "root" })
export class TestAuthClientForPublicUser implements AbstractAuthClient {
  private _authClientStub = createAuthClientStub(createAuthUserStub(UserRole.PUBLIC))

  public user = this._authClientStub.user
  public createUserWithEmailAndPassword = this._authClientStub.createUserWithEmailAndPassword
  public signInWithEmailAndPassword = this._authClientStub.signInWithEmailAndPassword
  public signOut = this._authClientStub.signOut
  public signInAnonymously = this._authClientStub.signInAnonymously
  public signInWithPopup = this._authClientStub.signInWithPopup
  public useDeviceLanguage = this._authClientStub.useDeviceLanguage
  public currentUser = this._authClientStub.currentUser
  public authState = this._authClientStub.authState
  public idTokenResult = this._authClientStub.idTokenResult
}

export type AuthProvider = auth.AuthProvider
export type { User as AuthClientUser } from "firebase"
export { AngularFireAuth as AuthClient }
export { AngularFireAuth }

