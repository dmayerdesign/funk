import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { ShopApi } from '@funk/ui/core/shop/api'
import { ShopState } from '@funk/ui/core/shop/model'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { ShopContainer } from '@funk/ui/web/app/shop/container'
import { HomeContainer } from '@funk/ui/web/app/shop/home/container'
import { IonicModule } from '@ionic/angular'

const routes: Routes = [
  {
    path: '',
    component: ShopContainer,
    children: [
      {
        path: 'home',
        component: HomeContainer,
      },
    ],
  },
]

export const shopInitialState: ShopState = {
  cart: {
    skus: [],
    customer: {},
  },
  attributeValues: [],
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    AppFireModule,
    VexModule.forRoot<ShopState>(shopInitialState),
  ],
  declarations: [
    ShopContainer,
    HomeContainer,
  ],
  providers: [
    ShopApi,
  ],
})
export class ShopModule
{ }
