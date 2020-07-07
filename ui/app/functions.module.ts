import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { GET_SECRET, SET_SECRET, GRANT_SUPER_ROLE_TO_ME } from "@funk/ui/app/admin/tokens"
import { construct as constructAdminGetSecret } from "@funk/ui/functions/admin/get-secret"
import { construct as constructAdminGrantSuperRoleToMe } from
  "@funk/ui/functions/admin/grant-super-role-to-me"
import { construct as constructAdminSetSecret } from "@funk/ui/functions/admin/set-secret"
import { construct as constructCommerceOrderSetSkuQuantity } from
  "@funk/ui/functions/commerce/order/set-sku-quantity"
import { construct as constructCommerceProductListPublished } from
  "@funk/ui/functions/commerce/product/list-published"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { SET_SKU_QUANTITY } from "@funk/ui/app/shop/orders/tokens"
import { LIST_PUBLISHED } from "@funk/ui/app/shop/product/tokens"

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: GET_SECRET,
      useFactory: constructAdminGetSecret,
      deps: [ FunctionsClient ],
    },
    {
      provide: GRANT_SUPER_ROLE_TO_ME,
      useFactory: constructAdminGrantSuperRoleToMe,
      deps: [ FunctionsClient ],
    },
    {
      provide: SET_SECRET,
      useFactory: constructAdminSetSecret,
      deps: [ FunctionsClient ],
    },
    {
      provide: SET_SKU_QUANTITY,
      useFactory: constructCommerceOrderSetSkuQuantity,
      deps: [ FunctionsClient ],
    },
    {
      provide: LIST_PUBLISHED,
      useFactory: constructCommerceProductListPublished,
      deps: [ FunctionsClient ],
    },
  ],
})
export class FunctionsModule
{ }
