import { HttpClientModule } from "@angular/common/http"
import { NgModule } from "@angular/core"
import { construct as constructAdminGetSecret } from "@funk/admin/infrastructure/external/cloud-functions/get-secret"
import { construct as constructAdminGrantSuperRoleToMe } from "@funk/admin/infrastructure/external/cloud-functions/grant-super-role-to-me"
import { construct as constructAdminSetSecret } from "@funk/admin/infrastructure/external/cloud-functions/set-secret"
import {
  GET_SECRET,
  GRANT_SUPER_ROLE_TO_ME,
  SET_SECRET,
} from "@funk/admin/infrastructure/external/tokens"
import { construct as constructCommerceOrderSetSkuQuantity } from "@funk/commerce/order/infrastructure/external/cloud-functions/set-sku-quantity"
import { construct as constructCommerceProductListPublished } from "@funk/commerce/product/infrastructure/external/cloud-functions/list-published"
import { SET_SKU_QUANTITY } from "@funk/commerce/shop/infrastructure/external/orders/tokens"
import { LIST_PUBLISHED } from "@funk/commerce/shop/infrastructure/external/product/tokens"
import { SKU_IMPORT } from "@funk/commerce/shop/infrastructure/external/sku/tokens"
import { construct as constructCommerceSkuImport } from "@funk/commerce/sku/infrastructure/external/cloud-functions/import"
import { INTEGRATION_TEST } from "@funk/configuration"
import { construct as constructContactOwner } from "@funk/contact/infrastructure/external/cloud-functions/owner"
import { CONTACT_OWNER } from "@funk/professional-portfolio/infrastructure/external/tokens"
import { construct as constructTestAdminGetSecret } from "@funk/test/infrastructure/external/cloud-functions/admin/get-secret"
import { construct as constructTestAdminGrantSuperRoleToMe } from "@funk/test/infrastructure/external/cloud-functions/admin/grant-super-role-to-me"
import { construct as constructTestAdminSetSecret } from "@funk/test/infrastructure/external/cloud-functions/admin/set-secret"
import { construct as constructTestCommerceOrderSetSkuQuantity } from "@funk/test/infrastructure/external/cloud-functions/commerce/order/set-sku-quantity"
import { construct as constructTestCommerceProductListPublished } from "@funk/test/infrastructure/external/cloud-functions/commerce/product/list-published"
import { construct as constructTestCommerceSkuImport } from "@funk/test/infrastructure/external/cloud-functions/commerce/sku/import"
import { construct as constructTestContactOwner } from "@funk/test/infrastructure/external/cloud-functions/contact/owner"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: GET_SECRET,
      useFactory: INTEGRATION_TEST
        ? constructTestAdminGetSecret
        : constructAdminGetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: GRANT_SUPER_ROLE_TO_ME,
      useFactory: INTEGRATION_TEST
        ? constructTestAdminGrantSuperRoleToMe
        : constructAdminGrantSuperRoleToMe,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SECRET,
      useFactory: INTEGRATION_TEST
        ? constructTestAdminSetSecret
        : constructAdminSetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SKU_QUANTITY,
      useFactory: INTEGRATION_TEST
        ? constructTestCommerceOrderSetSkuQuantity
        : constructCommerceOrderSetSkuQuantity,
      deps: [FunctionsClient],
    },
    {
      provide: LIST_PUBLISHED,
      useFactory: INTEGRATION_TEST
        ? constructTestCommerceProductListPublished
        : constructCommerceProductListPublished,
      deps: [FunctionsClient],
    },
    {
      provide: SKU_IMPORT,
      useFactory: INTEGRATION_TEST
        ? constructTestCommerceSkuImport
        : constructCommerceSkuImport,
      deps: [FunctionsClient],
    },
    {
      provide: CONTACT_OWNER,
      useFactory: INTEGRATION_TEST
        ? constructTestContactOwner
        : constructContactOwner,
      deps: [FunctionsClient],
    },
  ],
})
export class FunctionsModule {}
