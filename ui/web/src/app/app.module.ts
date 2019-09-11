import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { createAppInitializer } from './app.initializer'
import { FireModule } from './fire.module'
import { IdentityApi } from './identity/api'
import { IdentityModule } from './identity/module'
import { MaterialModule } from './material.module'
import { NotFoundComponent } from './not-found/component'

const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () => import('./shop/module').then((mod) => mod.ShopModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account-management/module').then(
      (mod) => mod.AccountManagementModule
    ),
    ...canActivate(redirectUnauthorizedTo(['/'])),
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
    MaterialModule,
    FireModule,
    IdentityModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: createAppInitializer,
      deps: [ IdentityApi ],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
