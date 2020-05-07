import { MarshalledAttributeValues, PopulatedAttributeValues } from '@funk/model/commerce/attribute/attribute-value'
import { Price } from '@funk/model/commerce/price/price'
import { Inventory } from '@funk/model/commerce/product/sku/inventory'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ImageGroup } from '@funk/model/image/image-group'
import { Duration } from '@funk/model/time/duration'
import { Weight } from '@funk/model/weight/weight'
import { TaxonomyTerm } from '../../taxonomy/taxonomy-term'

export const SKUS = 'commerce.skus'

/**
 * This schema is largely based on Google's product data spec.
 * @see https://support.google.com/merchants/answer/7052112?hl=en&ref_topic=6324338
 */
interface BaseSku extends DatabaseDocument {
  name: string
  description?: string
  /** `id` of the parent `Product`. */
  productId: PrimaryKey
  price: Price
  inventory: Inventory
  netWeight: Weight
  defaultImageGroupId?: PrimaryKey
  isDefaultSku?: boolean
  isAvailableForPreorder?: boolean
  costOfGoodsSold?: Price
  unitPricingBaseMeasure?: Weight
  /** Global Trade Item Number */
  gtin?: string
  /** Manufacturer Part Number */
  mpn?: string
  adult?: boolean
  multipack?: number
  isBundle?: boolean
  shippingLabel?: 'perishable'|'oversized'|'fragile'
  maxHandlingTime?: Duration
  minHandlingTime?: Duration
  // shipping?: string // e.g. `US:CA:Overnight:16.00 USD`
  // tax?: Price
  // taxCategory?: string

  // TODO: The following should be seeded as default `Attributes` and `AttributeValues`.
  // ageGroup?: 'newborn'|'infant'|'toddler'|'kids'|'adult'
  // color?: string
  // gender?: 'M'|'F'|'A'
  // material?: string
  // pattern?: string
  // size?: string // e.g. 'XL'
  // sizeType?: 'regular'|'petite'|'plus'|'big and tall'|'maternity'
  // sizeSystem?: string
  // /** e.g. `A++` */
  // energyEfficiencyClass?: 'A++'|'A+'|'A'|'A-'|'B+'...
  // condition?: 'new'|'refurbished'|'used'
}

export interface MarshalledSku extends BaseSku {
  /** A `Sku` may have exactly one `AttributeValue` per `Attribute`. */
  attributeValues: MarshalledAttributeValues
  /**
   * A `Sku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `Skus`.
   */
  taxonomyTerms: PrimaryKey[]
  imageGroups?: PrimaryKey[]
}

export interface PopulatedSku extends BaseSku {
  /** A `Sku` may have exactly one `AttributeValue` per `Attribute`. */
  attributeValues: PopulatedAttributeValues
  /**
   * A `Sku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `Skus`.
   */
  taxonomyTerms: TaxonomyTerm[]
  imageGroups?: ImageGroup[]
}

export type Sku = MarshalledSku | PopulatedSku
