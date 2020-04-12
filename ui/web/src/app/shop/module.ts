import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { ShopApi } from '@funk/ui/core/shop/api'
import { ManagedContentModule } from '@funk/ui/web/app/admin/managed-content/module'
import { AppFireModule } from '@funk/ui/web/app/fire.module'
import { createModuleInitializer, INITIALIZE_CONTAINER } from '@funk/ui/web/app/initializer'
import { ShopContainer } from '@funk/ui/web/app/shop/container'
import { HomeContainer } from '@funk/ui/web/app/shop/home/container'
import { ProductModule } from '@funk/ui/web/app/shop/product/module'
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    AppFireModule,
    ManagedContentModule,
    ProductModule,
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
