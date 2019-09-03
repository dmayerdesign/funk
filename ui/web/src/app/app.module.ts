import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { AngularFireModule } from '@angular/fire'
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
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
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
