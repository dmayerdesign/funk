import { ModuleWithProviders, NgModule } from "@angular/core"
import { AngularFireModule } from "@angular/fire"
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth"
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore"
import { environment } from "@funk/ui/environments/environment"

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
})
export class AppFireModule
{
  public static withProviders(): ModuleWithProviders
  {
    return {
      ngModule: AppFireModule,
      providers: [
        AngularFirestore,
        AngularFireAuth,
      ],
    }
  }
}
