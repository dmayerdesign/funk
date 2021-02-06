import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { ActivatedRoute } from "@angular/router"
import { UserRole } from "@funk/auth/model/user-role"
import { AbstractAuthClient } from "@funk/auth/plugins/external/auth-client"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import {
  createAuthClientStub,
  createAuthUserStub
} from "@funk/identity/application/external/stubs"
import firebase from "firebase"
import { map, switchMap, tap } from "rxjs/operators"

type User = firebase.User

@Injectable({ providedIn: "root" })
export class AuthClientForTesting implements AbstractAuthClient {
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
  ) => Promise<firebase.auth.UserCredential>
  public signInWithEmailAndPassword!: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  public signOut!: () => Promise<void>
  public signInAnonymously!: () => Promise<firebase.auth.UserCredential>
  public signInWithPopup!: (
    provider: firebase.auth.AuthProvider,
  ) => Promise<firebase.auth.UserCredential>
  public useDeviceLanguage!: () => Promise<void>
}

export type AuthProvider = firebase.auth.AuthProvider
export type { User as AuthClientUser }
export { AngularFireAuth as AuthClient }
export { AngularFireAuth }

