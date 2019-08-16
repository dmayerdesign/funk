import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { StateModule } from 'ui/state/state-manager'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { shopInitialState, ShopState } from './shop.actions'
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
    StateModule.forRoot<ShopState>(shopInitialState)
  ],
  declarations: [
    ShopComponent,
    HomeComponent,
  ],
})
export class ShopModule { }
