import { ErrorHandler, NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouterModule } from "@angular/router"
import { construct as constructBuildMenuItem } from "@funk/model/ui/atlas/actions/build-menu-item"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import atlas from "@funk/ui/app/atlas/atlas"
import { APP_ATLAS, BUILD_MENU_ITEM } from "@funk/ui/app/atlas/tokens"
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
    FunctionsModule,
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
      provide: APP_ATLAS,
      useValue: atlas,
    },
    {
      provide: BUILD_MENU_ITEM,
      useFactory: constructBuildMenuItem,
      deps: [ APP_ATLAS ],
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{ }
