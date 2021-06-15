import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Routes } from "@angular/router"
import { construct as constructEnterprise } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { construct as constructCartSetSkuQuantity } from "@funk/commerce/shop/application/external/orders/cart/behaviors/set-sku-quantity"
import { construct as constructCart } from "@funk/commerce/shop/application/external/orders/cart/cart"
import { ShopContainer } from "@funk/commerce/shop/infrastructure/external/container"
import { construct as constructResolveEnterprise } from "@funk/commerce/shop/infrastructure/external/enterprise/resolve-enterprise"
import { HomeContainer } from "@funk/commerce/shop/infrastructure/external/home/container"
import { CheckoutComponent } from "@funk/commerce/shop/infrastructure/external/orders/checkout/component"
import {
  CART,
  CART_SET_SKU_QUANTITY,
  SET_SKU_QUANTITY,
} from "@funk/commerce/shop/infrastructure/external/orders/tokens"
import { ProductModule } from "@funk/commerce/shop/infrastructure/external/product/module"
import {
  ENTERPRISE,
  RESOLVE_ENTERPRISE,
} from "@funk/commerce/shop/infrastructure/external/tokens"
import { ContentModule } from "@funk/content/infrastructure/external/module"
import { USER_SESSION } from "@funk/identity/infrastructure/external/tokens"
import { LISTEN_FOR_ORGANIZATION_BY_ID } from "@funk/organization/infrastructure/external/persistence/tokens"
import { PersistenceModule } from "@funk/persistence/infrastructure/external/module"
import {
  LISTEN_BY_ID,
  POPULATE,
  QUERY_COLLECTION_FOR_METADATA,
} from "@funk/persistence/infrastructure/external/tokens"
import atlas from "@funk/ui/atlas/configuration"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
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
    ContentModule,
    ProductModule,
    AppCommonModule,
    PersistenceModule,
  ],
  declarations: [ShopContainer, HomeContainer, CheckoutComponent],
  providers: [
    {
      provide: ENTERPRISE,
      useFactory: constructEnterprise,
      deps: [LISTEN_FOR_ORGANIZATION_BY_ID],
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
