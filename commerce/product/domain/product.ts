import {
  MarshalledProductAttributeValues,
  ProductAttributeValues,
} from "@funk/commerce/attribute/domain/attribute-value"
import { Price } from "@funk/commerce/price/domain/price"
import { Review } from "@funk/commerce/review/domain/review"
import { TaxonomyTerm } from "@funk/commerce/taxonomy/domain/taxonomy-term"
import { ImageGroup } from "@funk/image/domain/image-group"
import { Organization } from "@funk/organization/domain/organization"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"
import { Timestamp } from "@funk/persistence/domain/timestamp"
import { InclusiveRange } from "@funk/range/domain/range"
import { Duration } from "@funk/time/domain/duration"

export const PRODUCTS = "commerce.products"

export interface Product extends DatabaseDocument {
  name: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey
  releaseDate?: Timestamp
  /**
   * Represents `subscriptionPeriod` and `subscriptionPeriodLength`
   * https://support.google.com/merchants/answer/7052112?hl=en&ref_topic=6324338
   */
  duration?: Duration
  isPublished?: boolean
  /** A `Product` may have multiple `AttributeValues` per `Attribute`. */
  attributeValues?: ProductAttributeValues
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. @required */
  taxonomyTerms?: TaxonomyTerm[]
  reviews?: Review[]
  brand?: Organization
  priceRange?: InclusiveRange<Price>
  discountedPriceRange?: InclusiveRange<Price>
}

export type MarshalledProduct = Omit<
  Product,
  "attributeValues" | "taxonomyTerms" | "reviews" | "brand"
> & {
  /** A `Product` may have multiple `AttributeValues` per `Attribute`. */
  attributeValues?: MarshalledProductAttributeValues
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. Required */
  taxonomyTerms?: PrimaryKey[]
  reviews?: PrimaryKey[]
  brand?: PrimaryKey
}
