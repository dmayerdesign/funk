import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule, Router } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AtlasModule } from "@funk/ui/app/atlas/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { AppComponent } from "@funk/ui/app/component"
import { AppErrorHandler } from "@funk/ui/app/error-handler"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { FunctionsModule } from "@funk/ui/app/functions.module"
import { IdentityModule } from "@funk/ui/app/identity/module"
import { NotFoundComponent } from "@funk/ui/app/not-found/component"
import { PersistenceModule } from "@funk/ui/app/persistence/module"
import routes from "@funk/ui/app/routes"
import { DEVICE_WIDTH, WINDOW, PAGE_TITLE } from "@funk/ui/app/tokens"
import { construct as constructPageTitle } from "@funk/ui/core/atlas/page-title"
import { construct as constructDeviceWidth } from "@funk/ui/plugins/layout/device-width"
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
    ManagedContentModule.withProviders(),
    IdentityModule,
    AtlasModule,
    FunctionsModule,
    AppCommonModule,
  ],
  declarations: [AppComponent, NotFoundComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    {
      provide: WINDOW,
      useValue: window,
    },
    {
      provide: DEVICE_WIDTH,
      useFactory: constructDeviceWidth,
      deps: [WINDOW],
    },
    {
      provide: PAGE_TITLE,
      useFactory: constructPageTitle,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
