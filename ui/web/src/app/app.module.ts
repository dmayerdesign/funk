import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './component'
import { AppErrorHandler } from './error-handler'
import { AppFireModule } from './fire.module'
import { IdentityApi } from './identity/api'
import { IdentityModule } from './identity/module'
import { createAppInitializer } from './initializer'
import { AppMaterialModule } from './material.module'
import { NotFoundComponent } from './not-found/component'

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/module').then((mod) => mod.AdminModule),
    // ...canActivate(() => redirectUnauthorizedTo(['/'])),
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
