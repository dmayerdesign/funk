import { Review } from '@funk/model/commerce/review/review'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'

export const PRODUCTS = 'commerce.products'

export interface Product extends DatabaseDocument
{
  name: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: PrimaryKey[]
  brand?: Organization
  releaseDate?: Timestamp
  reviews?: Review[]
  paymentData: any
}
