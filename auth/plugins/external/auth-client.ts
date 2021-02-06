import { AngularFireAuth } from "@angular/fire/auth"
import firebase from "firebase"
import { Observable } from "rxjs"

type User = firebase.User

export interface AbstractAuthClient {
  user: Observable<User | null>
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<firebase.auth.UserCredential>
  signOut: () => Promise<void>
  signInAnonymously: () => Promise<firebase.auth.UserCredential>
  signInWithPopup: (
    provider: firebase.auth.AuthProvider,
  ) => Promise<firebase.auth.UserCredential>
  useDeviceLanguage: () => Promise<void>
  currentUser: Promise<User | null>
  authState: Observable<User | null>
  idTokenResult: Observable<firebase.auth.IdTokenResult | null>
}

export type AuthProvider = firebase.auth.AuthProvider
export type { User as AuthClientUser }
export { AngularFireAuth as AuthClient }
export { AngularFireAuth }

