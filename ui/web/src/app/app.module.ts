import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from '@funk/ui/web/app/component'
import { AppErrorHandler } from '@funk/ui/web/app/error-handler'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { IdentityApi } from '@funk/ui/web/app/identity/api'
import { IdentityModule } from '@funk/ui/web/app/identity/module'
import { createAppInitializer } from '@funk/ui/web/app/initializer'
import { AppMaterialModule } from '@funk/ui/web/app/material.module'
import { NotFoundComponent } from '@funk/ui/web/app/not-found/component'

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/module').then((mod) => mod.AdminModule),
    ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/module').then((mod) => mod.ShopModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account-management/module').then(
      (mod) => mod.AccountManagementModule
    ),
    // ...canActivate(() => redirectUnauthorizedTo(['/'])),
  },
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppMaterialModule,
    AppFireModule,
    IdentityModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: createAppInitializer,
      deps: [ IdentityApi ],
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule
{ }
