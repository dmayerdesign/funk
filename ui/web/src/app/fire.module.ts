import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestore } from '@angular/fire/firestore'
import { environment } from '../environments/environment'

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
  ],
})
export class FireModule { }
