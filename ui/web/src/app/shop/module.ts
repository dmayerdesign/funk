import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { VexModule } from '@dannymayer/vex'
import { ShopApi } from '@funk/ui/core/shop/api'
import { ShopState } from '@funk/ui/core/shop/model'
import { ManagedContentModule } from '@funk/ui/web/app/admin/managed-content/module'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { createModuleInitializer, INITIALIZE_CONTAINER } from '@funk/ui/web/app/initializer'
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
    ManagedContentModule,
  ],
  declarations: [
    ShopContainer,
    HomeContainer,
  ],
  providers: [
    ShopApi,
    {
      provide: INITIALIZE_CONTAINER,
      useFactory: createModuleInitializer,
      deps: [ ShopApi ],
    },
  ],
})
export class ShopModule
{ }
