import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { Router, RouteReuseStrategy, RouterModule } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"
import { ContentModule } from "@funk/admin/content/infrastructure/external/module"
import { CONFIGURATION } from "@funk/configuration"
import { Configuration } from "@funk/configuration/model/configuration"
import { IdentityModule } from "@funk/identity/infrastructure/external/module"
import { OrganizationPersistenceModule } from "@funk/organization/infrastructure/external/persistence/module"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import { construct as constructPageTitle } from "@funk/ui/atlas/application/external/page-title"
import { AtlasModule } from "@funk/ui/atlas/infrastructure/external/module"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { AppComponent } from "@funk/ui/infrastructure/external/component"
import { AppErrorHandler } from "@funk/ui/infrastructure/external/error-handler"
import { AppFireModule } from "@funk/ui/infrastructure/external/fire.module"
import { FunctionsModule } from "@funk/ui/infrastructure/external/functions.module"
import routes from "@funk/ui/infrastructure/external/routes"
import {
  DEVICE_WIDTH,
  PAGE_TITLE,
  WINDOW,
} from "@funk/ui/infrastructure/external/tokens"
import { NotFoundComponent } from "@funk/ui/not-found/infrastructure/external/component"
import { construct as constructDeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { SplashScreen } from "@ionic-native/splash-screen/ngx"
import { StatusBar } from "@ionic-native/status-bar/ngx"
import { IonicModule, IonicRouteStrategy } from "@ionic/angular"
import { IonicStorageModule } from "@ionic/storage"

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled:
        CONFIGURATION === Configuration.STAGING ||
        CONFIGURATION === Configuration.PRODUCTION,
    }),
    AppFireModule,
    PersistenceModule,
    ContentModule.withProviders(),
    OrganizationPersistenceModule.withProviders(),
    IdentityModule,
    AtlasModule,
    FunctionsModule,
    AppCommonModule,
  ],
  declarations: [AppComponent, NotFoundComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
