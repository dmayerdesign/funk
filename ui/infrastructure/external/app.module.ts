import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { Router, RouteReuseStrategy, RouterModule } from "@angular/router"
import { ServiceWorkerModule } from "@angular/service-worker"
import { CONFIGURATION } from "@funk/configuration"
import { Configuration } from "@funk/configuration/model/configuration"
import { ContentModule } from "@funk/content/infrastructure/external/module"
import { IdentityModule } from "@funk/identity/infrastructure/external/module"
import { OrganizationPersistenceModule } from "@funk/organization/infrastructure/external/persistence/module"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import { CanLoadIntegrationTest } from "@funk/test/infrastructure/external/can-load-integration-test"
import { construct as constructPageTitle } from "@funk/ui/atlas/application/external/page-title"
import { AtlasModule } from "@funk/ui/atlas/infrastructure/external/module"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { AppComponent } from "@funk/ui/infrastructure/external/component"
import { AppErrorHandler } from "@funk/ui/infrastructure/external/error-handler"
import { AppFireModule } from "@funk/ui/infrastructure/external/fire.module"
import { FunctionsModule } from "@funk/ui/infrastructure/external/functions.module"
import routes from "@funk/ui/infrastructure/external/routes"
import {
  CAN_LOAD_INTEGRATION_TEST,
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
    RouterModule.forRoot(routes),
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
    {
      provide: CAN_LOAD_INTEGRATION_TEST,
      useClass: CanLoadIntegrationTest,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
