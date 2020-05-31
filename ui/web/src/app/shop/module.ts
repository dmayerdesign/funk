import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { CART, CART_SET_SKU_QUANTITY } from "@funk/ui/core/shop/orders/tokens"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { construct as constructSetSkuQuantity } from
  "@funk/ui/core/shop/orders/cart/actions/set-sku-quantity"
import { ManagedContentModule } from "@funk/ui/web/app/admin/managed-content/module"
import { AppFireModule } from "@funk/ui/web/app/fire.module"
import { ShopContainer } from "@funk/ui/web/app/shop/container"
import { HomeContainer } from "@funk/ui/web/app/shop/home/container"
import { ProductModule } from "@funk/ui/web/app/shop/product/module"
import { IonicModule } from "@ionic/angular"
import { IDENTITY } from "@funk/ui/core/identity/interface"
import { QUERY_COLLECTION_FOR_METADATA, LISTEN_BY_ID, POPULATE } from
  "@funk/ui/core/persistence/tokens"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"

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
      deps: [ IDENTITY, QUERY_COLLECTION_FOR_METADATA, LISTEN_BY_ID, POPULATE ],
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
