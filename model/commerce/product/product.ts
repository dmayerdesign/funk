import { Review } from '@funk/model/commerce/review/review'
import { TaxonomyTerm } from '@funk/model/commerce/taxonomy/taxonomy-term'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'
import { Duration } from '@funk/model/time/duration'

export const PRODUCTS = 'commerce.products'

interface BaseProduct extends DatabaseDocument {
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
}

export interface MarshalledProduct extends BaseProduct {
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: PrimaryKey[]
  reviews?: PrimaryKey[]
  brand?: PrimaryKey
}

export interface PopulatedProduct extends BaseProduct {
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: TaxonomyTerm[]
  reviews?: Review[]
  brand?: Organization
}

export type Product = MarshalledProduct | PopulatedProduct
