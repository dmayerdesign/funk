import { Review } from '@funk/model/commerce/review/review'
import { TaxonomyTerm } from '@funk/model/commerce/taxonomy/taxonomy-term'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'

export interface Product extends DatabaseDocument {
  // Aesthetic.
  name: string
  slug: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey

  /** A `Product` may have multiple `TaxonomyTerms` per `Taxonomy`. */
  taxonomyTerms: TaxonomyTerm[]

  // Sales.
  stockQuantity: number
  totalSales: number
  existsInStripe: boolean

  // Legal.
  gtin?: string
  mpn?: string
  nsn?: string

  // Misc.
  brand?: Organization
  releaseDate?: string
  reviews?: Review[]
}
