import { AttributeValue } from '@funk/model/commerce/attribute/attribute-value'
import { Price } from '@funk/model/commerce/price/price'
import { Review } from '@funk/model/commerce/review/review'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Dimensions } from '@funk/model/dimensions/dimensions'
import { ImageGroup } from '@funk/model/image/image-group'
import { Organization } from '@funk/model/organization/organization'
import { Weight } from '@funk/model/weight/weight'
import { TaxonomyTerm } from '../taxonomy/taxonomy-term'

export interface ProductSku extends DatabaseDocument {
  // Aesthetic.
  name: string
  description?: string
  imageGroups?: ImageGroup[]
  defaultImageGroupId?: PrimaryKey

  // Financial.
  price: Price
  salePrice: Price
  computedPrice?: Price

  // Organizational.
  productId: PrimaryKey
  isDefaultSku: boolean
  /** A `ProductSku` may have exactly one `AttributeValue` per `Attribute`. */
  attributeValues: {
    [attributeId: string]: AttributeValue
  }
  /**
   * A `ProductSku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `ProductSkus`.
   */
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
