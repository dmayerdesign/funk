import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { DeviceStorageApi } from '@funk/ui/core/device-storage/api'
import { AppComponent } from '@funk/ui/web/app/component'
import { AppErrorHandler } from '@funk/ui/web/app/error-handler'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IdentityModule } from '@funk/ui/web/app/identity/module'
import { NotFoundComponent } from '@funk/ui/web/app/not-found/component'
import routes from '@funk/ui/web/app/routes'
import { IonicModule } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage'
import { ManagedContentModule } from './admin/managed-content/module'
import { IonicDeviceStorageApi } from './device-storage/api'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppFireModule.withProviders(),
    IdentityModule,
    ManagedContentModule.withProviders(),
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
      provide: DeviceStorageApi,
      useClass: IonicDeviceStorageApi,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule
{ }
