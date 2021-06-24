import { InjectionToken } from "@angular/core"
import { AddHtmlBlogPostCoverImage } from "@funk/blog/infrastructure/external/cloud-functions/add-html-blog-post-cover-image"
import { GetTaxonomyTermBySlug } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { ListHtmlBlogPosts } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { TaxonomyTermSlugRouteParamResolver } from "@funk/blog/infrastructure/external/posts-by-taxonomy-term/taxonomy-term-slug-resolvers"
import { ListTaxonomyTerms } from "./cloud-functions/list-taxonomy-terms"

export const TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER = new InjectionToken<
  TaxonomyTermSlugRouteParamResolver
>("TAXONOMY_TERM_SLUG_ROUTE_PARAM_RESOLVER")
export const GET_TAXONOMY_TERM_BY_SLUG = new InjectionToken<
  GetTaxonomyTermBySlug
>("GET_TAXONOMY_TERM_BY_SLUG")
export const LIST_TAXONOMY_TERMS = new InjectionToken<ListTaxonomyTerms>(
  "LIST_TAXONOMY_TERMS",
)
export const LIST_HTML_BLOG_POSTS = new InjectionToken<ListHtmlBlogPosts>(
  "LIST_HTML_BLOG_POSTS",
)
export const ADD_HTML_BLOG_POST_COVER_IMAGE = new InjectionToken<
  AddHtmlBlogPostCoverImage
>("ADD_HTML_BLOG_POST_COVER_IMAGE")
