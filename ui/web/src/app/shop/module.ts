import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { FireModule } from '../fire.module'
import { MaterialModule } from '../material.module'
import { ShopApi } from './api'
import { ShopContainer } from './container'
import { HomeComponent } from './home/component'
import { shopInitialState, ShopState } from './model'

const routes: Routes = [
  {
    path: '',
    component: ShopContainer,
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
    FireModule,
    VexModule.forRoot<ShopState>(shopInitialState),
  ],
  declarations: [
    ShopContainer,
    HomeComponent,
  ],
  providers: [
    ShopApi,
  ],
})
export class ShopModule { }
