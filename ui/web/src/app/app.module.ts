import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppComponent } from '@funk/ui/web/app/component'
import { AppErrorHandler } from '@funk/ui/web/app/error-handler'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IdentityModule } from '@funk/ui/web/app/identity/module'
import { AppMaterialModule } from '@funk/ui/web/app/material.module'
import { NotFoundComponent } from '@funk/ui/web/app/not-found/component'
import routes from '@funk/ui/web/app/routes';
import { IonicModule } from '@ionic/angular'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppMaterialModule,
    AppFireModule.withProviders(),
    IdentityModule,
    IonicModule.forRoot(),
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
