import { Review } from '@funk/model/commerce/review/review'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'

export const PRODUCTS = 'products'

export interface Product extends DatabaseDocument {
  name: string
  slug: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey
  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: PrimaryKey[]
  stockQuantity: number
  totalSales: number
  existsInStripe: boolean
  brand?: Organization
  releaseDate?: Timestamp
  reviews?: Review[]
}
