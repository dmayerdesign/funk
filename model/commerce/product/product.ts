import {
  MarshalledProductAttributeValues,
  ProductAttributeValues
} from "@funk/model/commerce/attribute/attribute-value"
import { Review } from "@funk/model/commerce/review/review"
import { TaxonomyTerm } from "@funk/model/commerce/taxonomy/taxonomy-term"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { Timestamp } from "@funk/model/data-access/timestamp"
import { ImageGroup } from "@funk/model/image/image-group"
import { Organization } from "@funk/model/organization/organization"
import { Duration } from "@funk/model/time/duration"
import { Price } from "@funk/model/commerce/price/price"
import { InclusiveRange } from "@funk/model/range/range"

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
  priceRange: InclusiveRange<Price>
  discountedPriceRange: InclusiveRange<Price>
}

export type MarshalledProduct =
  Omit<Product, "attributeValues"|"taxonomyTerms"|"reviews"|"brand"> & {
    /** A `Product` may have multiple `AttributeValues` per `Attribute`. */
    attributeValues?: MarshalledProductAttributeValues
    /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. Required */
    taxonomyTerms?: PrimaryKey[]
    reviews?: PrimaryKey[]
    brand?: PrimaryKey
  }
