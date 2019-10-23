import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
  ],
})
export class AppFireModule { }
