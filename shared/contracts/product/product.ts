import { AttributeValue } from '../attribute/attribute-value'
import { DatabaseDocument } from '../data-access/database-document'
import { PrimaryKey } from '../data-access/primary-key'
import { Dimensions } from '../dimensions/dimensions'
import { ImageGroup } from '../image/image-group'
import { Organization } from '../organization/organization'
import { Price } from '../price/price'
import { Review } from '../review/review'
import { TaxonomyTerm } from '../taxonomy/taxonomy-term'
import { Weight } from '../weight/weight'
import { ProductRelationType } from './product-relation-type'

export interface Product extends DatabaseDocument {
  // Aesthetic.
  name: string
  alternateName?: string
  slug: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey

  // Financial.
  price: Price
  salePrice: Price
  computedPrice?: Price

  // Organizational.
  sku: string
  relationType: ProductRelationType
  isDefaultVariation: boolean
  variations: Product[]

  /** A Product may have one AttributeValue per Attribute. */
  attributeValues: {
    [attributeId: string]: AttributeValue
  }

  /** A Product may have multiple TaxonomyTerms per Taxonomy. */
  taxonomyTerms: TaxonomyTerm[]

  // Shipping.
  dimensions: Dimensions
  shippingWeight: Weight
  netWeight: Weight

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
