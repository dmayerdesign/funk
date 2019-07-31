import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
  // {
  //   path: 'shop',
  //   loadChildren: './shop/shop.module#ShopModule',
  // },
  // {
  //   path: '',
  //   redirectTo: '/shop',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
