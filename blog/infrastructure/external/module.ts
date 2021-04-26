import { NgModule } from "@angular/core"
import { BlogPostsByTaxonomyTermContainer } from "@funk/blog/infrastructure/external/posts-by-taxonomy-term/container"
import { TaxonomyTermSlugRouteParamResolver } from "@funk/blog/infrastructure/external/posts-by-taxonomy-term/taxonomy-term-slug-resolvers"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER } from "./tokens"

@NgModule({
  imports: [AppCommonModule],
  declarations: [BlogPostsByTaxonomyTermContainer],
  exports: [BlogPostsByTaxonomyTermContainer],
  providers: [
    {
      provide: TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER,
      useClass: TaxonomyTermSlugRouteParamResolver,
    },
  ],
})
export class BlogModule {}
