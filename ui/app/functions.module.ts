import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { TEST_PUBLIC_USER } from "@funk/configuration"
import {
  GET_SECRET,
  GRANT_SUPER_ROLE_TO_ME,
  SET_SECRET
} from "@funk/ui/app/admin/tokens"
import { CONTACT_OWNER } from "@funk/ui/app/professional-portfolio/tokens"
import { SET_SKU_QUANTITY } from "@funk/ui/app/shop/orders/tokens"
import { LIST_PUBLISHED } from "@funk/ui/app/shop/product/tokens"
import { SKU_IMPORT } from "@funk/ui/app/shop/sku/tokens"
import { construct as constructAdminGetSecret } from "@funk/ui/functions/admin/get-secret"
import { construct as constructAdminGrantSuperRoleToMe } from "@funk/ui/functions/admin/grant-super-role-to-me"
import { construct as constructAdminSetSecret } from "@funk/ui/functions/admin/set-secret"
import { construct as constructCommerceOrderSetSkuQuantity } from "@funk/ui/functions/commerce/order/set-sku-quantity"
import { construct as constructCommerceProductListPublished } from "@funk/ui/functions/commerce/product/list-published"
import { construct as constructCommerceSkuImport } from "@funk/ui/functions/commerce/sku/import"
import { construct as constructContactOwner } from "@funk/ui/functions/contact/owner"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { construct as constructTestAdminGetSecret } from "@funk/ui/test/functions/admin/get-secret"
import { construct as constructTestAdminGrantSuperRoleToMe } from "@funk/ui/test/functions/admin/grant-super-role-to-me"
import { construct as constructTestAdminSetSecret } from "@funk/ui/test/functions/admin/set-secret"
import { construct as constructTestCommerceOrderSetSkuQuantity } from "@funk/ui/test/functions/commerce/order/set-sku-quantity"
import { construct as constructTestCommerceProductListPublished } from "@funk/ui/test/functions/commerce/product/list-published"
import { construct as constructTestCommerceSkuImport } from "@funk/ui/test/functions/commerce/sku/import"
import { construct as constructTestContactOwner } from "@funk/ui/test/functions/contact/owner"

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: GET_SECRET,
      useFactory: TEST_PUBLIC_USER ? constructTestAdminGetSecret : constructAdminGetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: GRANT_SUPER_ROLE_TO_ME,
      useFactory: TEST_PUBLIC_USER ? constructTestAdminGrantSuperRoleToMe : constructAdminGrantSuperRoleToMe,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SECRET,
      useFactory: TEST_PUBLIC_USER ? constructTestAdminSetSecret : constructAdminSetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SKU_QUANTITY,
      useFactory: TEST_PUBLIC_USER ? constructTestCommerceOrderSetSkuQuantity : constructCommerceOrderSetSkuQuantity,
      deps: [FunctionsClient],
    },
    {
      provide: LIST_PUBLISHED,
      useFactory: TEST_PUBLIC_USER ? constructTestCommerceProductListPublished : constructCommerceProductListPublished,
      deps: [FunctionsClient],
    },
    {
      provide: SKU_IMPORT,
      useFactory: TEST_PUBLIC_USER ? constructTestCommerceSkuImport : constructCommerceSkuImport,
      deps: [FunctionsClient],
    },
    {
      provide: CONTACT_OWNER,
      useFactory: TEST_PUBLIC_USER ? constructTestContactOwner : constructContactOwner,
      deps: [FunctionsClient],
    },
  ],
})
export class FunctionsModule {}
