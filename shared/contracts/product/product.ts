import { AttributeValue } from '../attribute/attribute-value'
import { DatabaseDocument } from '../data-access/database-document'
import { PrimaryKey } from '../data-access/primary-key'
import { Dimensions } from '../dimensions/dimensions'
import { ImageGroup } from '../image/image-group'
import { Price } from '../price/price'
import { TaxonomyTerm } from '../taxonomy/taxonomy-term'
import { Weight } from '../weight/weight'
import { ProductRelationType } from './product-relation-type'

export interface Product extends DatabaseDocument {
  // Aesthetic.
  name: string
  slug: string
  description: string
  imageGroups: ImageGroup[]
  defaultImageGroupId: PrimaryKey

  // Financial.
  price: Price
  salePrice: Price

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

  /** Product-specific */
  additionalTax: Price

  // Sales.
  stockQuantity: number
  totalSales: number
  existsInStripe: boolean
}
