import { NgModule } from "@angular/core"
import { AngularFireModule } from "@angular/fire"
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestore, AngularFirestoreModule, SETTINGS } from "@angular/fire/firestore"
import { IS_LOCAL, FIREBASE_CONFIG } from '@funk/config'

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
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
    {
      provide: SETTINGS,
      useValue: IS_LOCAL
        ? {
          host: "localhost:8080",
          ssl: false,
        }
        : undefined,
    },
  ],
})
export class AppFireModule
{ }
