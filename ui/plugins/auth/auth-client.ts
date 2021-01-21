import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { ActivatedRoute } from "@angular/router"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserRole } from "@funk/model/auth/user-role"
import {
  createAuthClientStub,
  createAuthUserStub,
} from "@funk/ui/core/identity/stubs"
import { auth, User } from "firebase/app"
import { Observable } from "rxjs"
import { map, switchMap, tap } from "rxjs/operators"

export interface AbstractAuthClient {
  user: Observable<User | null>
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<auth.UserCredential>
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<auth.UserCredential>
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
  private _authClientStub$ = this._activatedRoute.queryParamMap.pipe(
    map((queryParamMap) =>
      createAuthClientStub(
        createAuthUserStub(
          (queryParamMap.get("test_user_role") as UserRole) ?? UserRole.PUBLIC,
          queryParamMap.get("test_user_id") ?? "test-user-basic",
        ),
      ),
    ),
    tap((authClientStub) => {
      this.currentUser = authClientStub.currentUser
      this.createUserWithEmailAndPassword =
        authClientStub.createUserWithEmailAndPassword
      this.signInWithEmailAndPassword =
        authClientStub.signInWithEmailAndPassword
      this.signOut = authClientStub.signOut
      this.signInAnonymously = authClientStub.signInAnonymously
      this.signInWithPopup = authClientStub.signInWithPopup
      this.useDeviceLanguage = authClientStub.useDeviceLanguage
    }),
    shareReplayOnce(),
  )

  public constructor(private _activatedRoute: ActivatedRoute) {}

  public user = this._authClientStub$.pipe(
    switchMap((authClientStub) => authClientStub.user),
    shareReplayOnce(),
  )
  public authState = this._authClientStub$.pipe(
    switchMap((authClientStub) => authClientStub.authState),
    shareReplayOnce(),
  )
  public idTokenResult = this._authClientStub$.pipe(
    switchMap((authClientStub) => authClientStub.idTokenResult),
    shareReplayOnce(),
  )
  public currentUser!: Promise<User | null>
  public createUserWithEmailAndPassword!: (
    email: string,
    password: string,
  ) => Promise<auth.UserCredential>
  public signInWithEmailAndPassword!: (
    email: string,
    password: string,
  ) => Promise<auth.UserCredential>
  public signOut!: () => Promise<void>
  public signInAnonymously!: () => Promise<auth.UserCredential>
  public signInWithPopup!: (
    provider: auth.AuthProvider,
  ) => Promise<auth.UserCredential>
  public useDeviceLanguage!: () => Promise<void>
}

export type AuthProvider = auth.AuthProvider
export type { User as AuthClientUser } from "firebase"
export { AngularFireAuth as AuthClient }
export { AngularFireAuth }
