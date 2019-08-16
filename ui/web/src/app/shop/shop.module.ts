import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BehaviorModule } from 'ui/behavior/behavior-manager'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { ShopState } from './shop.behaviors'
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
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    BehaviorModule.forRoot<ShopState>({
      cart: {}
    })
  ],
  declarations: [
    ShopComponent,
    HomeComponent,
  ],
})
export class ShopModule { }
