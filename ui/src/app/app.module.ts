import { HttpClientModule } from "@angular/common/http"
import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { AppComponent } from "@funk/ui/app/component"
import { AppErrorHandler } from "@funk/ui/app/error-handler"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { IdentityModule } from "@funk/ui/app/identity/module"
import { NotFoundComponent } from "@funk/ui/app/not-found/component"
import routes from "@funk/ui/app/routes"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage"
import { PersistenceModule } from "@funk/ui/app/persistence/module"

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppFireModule.withProviders(),
    IdentityModule,
    ManagedContentModule.withProviders(),
    AppCommonModule,
    PersistenceModule.forRoot(),
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
