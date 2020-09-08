import { NgModule } from "@angular/core"
import { AngularFireModule } from "@angular/fire"
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestore, AngularFirestoreModule, SETTINGS } from "@angular/fire/firestore"
import { configuration } from "@funk/ui/configurations/configuration"

@NgModule({
  imports: [
    AngularFireModule.initializeApp(configuration.firebaseConfig),
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
      useValue: configuration.local
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
