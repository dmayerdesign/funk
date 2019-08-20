import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home/home.component'
import { ShopApi } from './shop.api'
import { ShopComponent } from './shop.component'
import { shopInitialState, ShopState } from './shop.model'

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
    VexModule.forRoot<ShopState>(shopInitialState),
  ],
  declarations: [
    ShopComponent,
    HomeComponent,
  ],
  providers: [
    ShopApi,
  ],
})
export class ShopModule { }
