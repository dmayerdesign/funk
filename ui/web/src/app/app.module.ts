import { HttpClientModule } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { appInitializer } from './app.initializer'
import { IdentityApi } from './identity/api';
import { MaterialModule } from './material.module'
import { NotFoundComponent } from './not-found/component'

const routes: Routes = [
  {
    path: 'shop',
    loadChildren: () => import('./shop/module').then((mod) => mod.ShopModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account-management/module')
      .then((mod) => mod.AccountManagementModule),
    ...canActivate(redirectUnauthorizedTo(['login'])),
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [ IdentityApi ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
