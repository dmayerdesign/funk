import { HttpClientModule } from "@angular/common/http"
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { DEVICE_STORAGE } from "@funk/ui/core/device-storage/interface"
import { IdentityApi } from "@funk/ui/core/identity/api"
import { IDENTITY } from "@funk/ui/core/identity/interface"
import { PersistenceApi } from "@funk/ui/core/persistence/api"
import { PERSISTENCE } from "@funk/ui/core/persistence/interface"
import { ManagedContentModule } from "@funk/ui/web/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/web/app/common.module"
import { AppComponent } from "@funk/ui/web/app/component"
import { DeviceStorageApi } from "@funk/ui/web/app/device-storage/api"
import { AppErrorHandler } from "@funk/ui/web/app/error-handler"
import { AppFireModule } from "@funk/ui/web/app/fire.module"
import { IdentityModule } from "@funk/ui/web/app/identity/module"
import { createModuleInitializer } from "@funk/ui/web/app/initializer"
import { NotFoundComponent } from "@funk/ui/web/app/not-found/component"
import routes from "@funk/ui/web/app/routes"
import { IonicModule } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage"

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
      provide: PERSISTENCE,
      useClass: PersistenceApi,
    },
    {
      provide: DEVICE_STORAGE,
      useClass: DeviceStorageApi,
    },
    {
      provide: IDENTITY,
      useClass: IdentityApi,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: createModuleInitializer,
      deps: [ DEVICE_STORAGE ],
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{ }
