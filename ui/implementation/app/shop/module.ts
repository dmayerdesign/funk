import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { CART, CART_SET_SKU_QUANTITY } from "@funk/ui/app/shop/orders/tokens"
import { construct as constructCart } from "@funk/ui/app/shop/orders/cart/cart"
import { construct as constructSetSkuQuantity } from
  "@funk/ui/app/shop/orders/cart/actions/set-sku-quantity"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { ShopContainer } from "@funk/ui/app/shop/container"
import { HomeContainer } from "@funk/ui/app/shop/home/container"
import { ProductModule } from "@funk/ui/app/shop/product/module"
import { IonicModule } from "@ionic/angular"
import { QUERY_COLLECTION_FOR_METADATA, LISTEN_BY_ID, POPULATE } from
  "@funk/ui/app/persistence/tokens"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"

const routes: Routes = [
  {
    path: "",
    component: ShopContainer,
    children: [
      {
        path: "home",
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
    {
      provide: CART,
      useFactory: constructCart,
      deps: [ USER_SESSION, QUERY_COLLECTION_FOR_METADATA, LISTEN_BY_ID, POPULATE ],
    },
    {
      provide: CART_SET_SKU_QUANTITY,
      useFactory: constructSetSkuQuantity,
      deps: [ CART, FunctionsClient ],
    },
  ],
})
export class ShopModule
{ }
