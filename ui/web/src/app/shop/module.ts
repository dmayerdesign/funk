import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { AppFireModule } from '../fire.module'
import { AppMaterialModule } from '../material.module'
import { ShopApi } from './api'
import { ShopContainer } from './container'
import { HomeComponent } from './home/component'
import { ShopState } from './model'

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

export const shopInitialState: ShopState = {
  cart: {
    products: [],
  },
  attributeValues: [],
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    AppFireModule,
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
export class ShopModule
{ }
