import { AttributeValue } from '@funk/model/commerce/attribute/attribute-value'
import { Price } from '@funk/model/commerce/price/price'
import { Review } from '@funk/model/commerce/review/review'
import { TaxonomyTerm } from '@funk/model/commerce/taxonomy/taxonomy-term'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Dimensions } from '@funk/model/dimensions/dimensions'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'
import { Weight } from '@funk/model/weight/weight'
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
