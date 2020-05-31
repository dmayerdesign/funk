import { HttpClientModule } from "@angular/common/http"
import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { IdentityApi } from "@funk/ui/core/identity/api"
import { IDENTITY } from "@funk/ui/core/identity/interface"
import { ManagedContentModule } from "@funk/ui/web/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/web/app/common.module"
import { AppComponent } from "@funk/ui/web/app/component"
import { AppErrorHandler } from "@funk/ui/web/app/error-handler"
import { AppFireModule } from "@funk/ui/web/app/fire.module"
import { IdentityModule } from "@funk/ui/web/app/identity/module"
import { NotFoundComponent } from "@funk/ui/web/app/not-found/component"
import routes from "@funk/ui/web/app/routes"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage"
import { PersistenceModule } from "@funk/ui/core/persistence/module"

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
    {
      provide: IDENTITY,
      useClass: IdentityApi,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{ }
