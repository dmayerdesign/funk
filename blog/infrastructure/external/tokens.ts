import { InjectionToken } from "@angular/core"
import { TaxonomyTermSlugRouteParamResolver } from "@funk/blog/infrastructure/external/posts-by-taxonomy-term/taxonomy-term-slug-resolvers"
import { GetTaxonomyTermBySlug } from "./cloud-functions/get-taxonomy-term-by-slug"
import { ListHtmlBlogPosts } from "./cloud-functions/list-html-blog-posts"

export const TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER = new InjectionToken<
  TaxonomyTermSlugRouteParamResolver
>("TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER")
export const GET_TAXONOMY_TERM_BY_SLUG = new InjectionToken<
  GetTaxonomyTermBySlug
>("GET_TAXONOMY_TERM_BY_SLUG")
export const LIST_HTML_BLOG_POSTS = new InjectionToken<ListHtmlBlogPosts>(
  "LIST_HTML_BLOG_POSTS",
)
