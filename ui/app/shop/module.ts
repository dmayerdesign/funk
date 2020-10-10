import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { ManagedContentModule } from "@funk/ui/app/admin/managed-content/module"
import { AppCommonModule } from "@funk/ui/app/common.module"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import {
  LISTEN_BY_ID,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
} from "@funk/ui/app/persistence/tokens"
import { ShopContainer } from "@funk/ui/app/shop/container"
import { construct as constructResolveEnterprise } from "@funk/ui/app/shop/enterprise/resolve-enterprise"
import { HomeContainer } from "@funk/ui/app/shop/home/container"
import { CheckoutComponent } from "@funk/ui/app/shop/orders/checkout/component"
import {
  CART,
  CART_SET_SKU_QUANTITY,
  SET_SKU_QUANTITY,
} from "@funk/ui/app/shop/orders/tokens"
import { ProductModule } from "@funk/ui/app/shop/product/module"
import { ENTERPRISE, RESOLVE_ENTERPRISE } from "@funk/ui/app/shop/tokens"
import atlas from "@funk/ui/core/atlas/atlas"
import { construct as constructEnterprise } from "@funk/ui/core/shop/enterprise/enterprise"
import { construct as constructCartSetSkuQuantity } from "@funk/ui/core/shop/orders/cart/behaviors/set-sku-quantity"
import { construct as constructCart } from "@funk/ui/core/shop/orders/cart/cart"
import { IonicModule } from "@ionic/angular"

const routes: Routes = [
  {
    path: "",
    component: ShopContainer,
    data: {
      title: atlas.shop.label,
    },
    resolve: {
      enterprise: RESOLVE_ENTERPRISE,
    },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: HomeContainer,
        data: {
          title: atlas.shop.__atlas__.home.label,
        },
      },
      {
        path: "checkout",
        component: CheckoutComponent,
        data: {
          title: atlas.shop.__atlas__.checkout.label,
        },
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
    ManagedContentModule,
    ProductModule,
    AppCommonModule,
  ],
  declarations: [ShopContainer, HomeContainer, CheckoutComponent],
  providers: [
    {
      provide: ENTERPRISE,
      useFactory: constructEnterprise,
      deps: [LISTEN_BY_ID],
    },
    {
      provide: RESOLVE_ENTERPRISE,
      useFactory: constructResolveEnterprise,
      deps: [ENTERPRISE],
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
      useFactory: constructCartSetSkuQuantity,
      deps: [CART, SET_SKU_QUANTITY],
    },
  ],
})
export class ShopModule {}
