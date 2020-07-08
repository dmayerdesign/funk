import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AtlasModule } from "@funk/ui/app/atlas/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { AppComponent } from "@funk/ui/app/component"
import { AppErrorHandler } from "@funk/ui/app/error-handler"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { FunctionsModule } from "@funk/ui/app/functions.module"
import { IdentityModule } from "@funk/ui/app/identity/module"
import { NotFoundComponent } from "@funk/ui/app/not-found/component"
import routes from "@funk/ui/app/routes"
import { PersistenceModule } from "@funk/ui/app/persistence/module"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage"

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    RouterModule.forRoot(routes),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppFireModule,
    PersistenceModule,
    ManagedContentModule,
    IdentityModule,
    AtlasModule,
    FunctionsModule,
    AppCommonModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{ }
