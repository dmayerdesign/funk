import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ENTERPRISE, RESOLVE_ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { CART, CART_SET_SKU_QUANTITY } from "@funk/ui/app/shop/orders/tokens"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { AppFireModule } from "@funk/ui/app/fire.module"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { ShopContainer } from "@funk/ui/app/shop/container"
import { HomeContainer } from "@funk/ui/app/shop/home/container"
import { ProductModule } from "@funk/ui/app/shop/product/module"
import { construct as constructResolveEnterprise } from
  "@funk/ui/app/shop/enterprise/resolve-enterprise"
import { QUERY_COLLECTION_FOR_METADATA, LISTEN_BY_ID, POPULATE } from
  "@funk/ui/app/persistence/tokens"
import { CheckoutComponent } from "@funk/ui/app/shop/orders/checkout/component"
import { construct as constructEnterprise } from "@funk/ui/core/shop/enterprise/enterprise"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { construct as constructSetSkuQuantity } from
  "@funk/ui/core/shop/orders/cart/actions/set-sku-quantity"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { IonicModule } from "@ionic/angular"

const routes: Routes = [
  {
    path: "",
    component: ShopContainer,
    resolve: {
      enterprise: RESOLVE_ENTERPRISE,
    },
    children: [
      {
        path: "home",
        component: HomeContainer,
      },
      {
        path: "checkout",
        component: CheckoutComponent,
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
    AppCommonModule,
  ],
  declarations: [
    ShopContainer,
    HomeContainer,
    CheckoutComponent,
  ],
  providers: [
    {
      provide: ENTERPRISE,
      useFactory: constructEnterprise,
      deps: [ LISTEN_BY_ID ],
    },
    {
      provide: RESOLVE_ENTERPRISE,
      useFactory: constructResolveEnterprise,
      deps: [ ENTERPRISE ],
    },
    {
      provide: CART,
      useFactory: constructCart,
      deps: [
        USER_SESSION,
        QUERY_COLLECTION_FOR_METADATA,
        LISTEN_BY_ID,
        POPULATE,
      ],
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
