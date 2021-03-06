import { AttributeValue } from "@funk/attribute/model/attribute-value"
import { Price } from "@funk/commerce/price/model/price"
import { Review } from "@funk/commerce/review/model/review"
import { ImageGroup } from "@funk/content/image-group/model/image-group"
import { InclusiveRange } from "@funk/math/model/range"
import { Organization } from "@funk/organization/model/organization"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"
import { Duration } from "@funk/time/model/duration"
import { Instant } from "@funk/time/model/instant"

export const PRODUCTS = "commerce.products"

export interface Product extends DatabaseDocument {
  name: string
  description?: string
  imageGroups: ImageGroup[]
  defaultImageGroupId?: PrimaryKey
  releaseDate?: Instant
  /**
   * Represents `subscriptionPeriod` and `subscriptionPeriodLength`
   * https://support.google.com/merchants/answer/7052112?hl=en&ref_topic=6324338
   */
  duration?: Duration
  isPublished?: boolean
  /** A `Product` may have multiple `AttributeValues` per `Attribute`. */
  attributeValues: AttributeValue[]
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: TaxonomyTerm[]
  reviews: Review[]
  brand?: Organization
  priceRange?: InclusiveRange<Price>
  discountedPriceRange?: InclusiveRange<Price>
}
