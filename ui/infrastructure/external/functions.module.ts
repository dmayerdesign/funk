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
import { construct as constructAddHtmlBlogPostCoverImage } from "@funk/blog/infrastructure/external/cloud-functions/add-html-blog-post-cover-image"
import { construct as constructGetTaxonomyTermBySlug } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { construct as constructListHtmlBlogPosts } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import {
  ADD_HTML_BLOG_POST_COVER_IMAGE,
  GET_TAXONOMY_TERM_BY_SLUG,
  LIST_HTML_BLOG_POSTS,
} from "@funk/blog/infrastructure/external/tokens"
import { construct as constructCommerceOrderSetSkuQuantity } from "@funk/commerce/order/infrastructure/external/cloud-functions/set-sku-quantity"
import { construct as constructCommerceProductListPublished } from "@funk/commerce/product/infrastructure/external/cloud-functions/list-published"
import { SET_SKU_QUANTITY } from "@funk/commerce/shop/infrastructure/external/orders/tokens"
import { LIST_PUBLISHED } from "@funk/commerce/shop/infrastructure/external/product/tokens"
import { SKU_IMPORT } from "@funk/commerce/shop/infrastructure/external/sku/tokens"
import { construct as constructCommerceSkuImport } from "@funk/commerce/sku/infrastructure/external/cloud-functions/import"
import { construct as constructContactOwner } from "@funk/contact/infrastructure/external/cloud-functions/owner"
import { CONTACT_OWNER } from "@funk/portfolio/infrastructure/external/tokens"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: GET_SECRET,
      useFactory: constructAdminGetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: GRANT_SUPER_ROLE_TO_ME,
      useFactory: constructAdminGrantSuperRoleToMe,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SECRET,
      useFactory: constructAdminSetSecret,
      deps: [FunctionsClient],
    },
    {
      provide: SET_SKU_QUANTITY,
      useFactory: constructCommerceOrderSetSkuQuantity,
      deps: [FunctionsClient],
    },
    {
      provide: LIST_PUBLISHED,
      useFactory: constructCommerceProductListPublished,
      deps: [FunctionsClient],
    },
    {
      provide: SKU_IMPORT,
      useFactory: constructCommerceSkuImport,
      deps: [FunctionsClient],
    },
    {
      provide: CONTACT_OWNER,
      useFactory: constructContactOwner,
      deps: [FunctionsClient],
    },
    {
      provide: GET_TAXONOMY_TERM_BY_SLUG,
      useFactory: constructGetTaxonomyTermBySlug,
      deps: [FunctionsClient],
    },
    {
      provide: LIST_HTML_BLOG_POSTS,
      useFactory: constructListHtmlBlogPosts,
      deps: [FunctionsClient],
    },
    {
      provide: ADD_HTML_BLOG_POST_COVER_IMAGE,
      useFactory: constructAddHtmlBlogPostCoverImage,
      deps: [FunctionsClient],
    },
  ],
})
export class FunctionsModule {}
