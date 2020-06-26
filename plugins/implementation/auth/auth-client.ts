import { auth } from "firebase/app"

export type AuthProvider = auth.AuthProvider
export { AngularFireAuth as AuthClient } from "@angular/fire/auth"
export { User as AuthClientUser } from "firebase"
