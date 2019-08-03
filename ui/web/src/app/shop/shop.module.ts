import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { ShopComponent } from './shop.component'

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'prefix',
  // }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [
    ShopComponent,
    HomeComponent,
  ],
  exports: [
    RouterModule,
  ],
})
export class ShopModule { }
