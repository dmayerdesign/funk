import {
    MarshalledSkuAttributeValues,
    SkuAttributeValues
} from "@funk/commerce/attribute/model/attribute-value"
import { Price } from "@funk/commerce/price/model/price"
import { Inventory } from "@funk/commerce/sku/model/inventory"
import { TaxonomyTerm } from "@funk/commerce/taxonomy/model/taxonomy-term"
import { ImageGroup } from "@funk/image/model/image-group"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { Duration } from "@funk/time/model/duration"
import { Weight } from "@funk/weight/model/weight"

export const SKUS = "commerce.skus"

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
  /** AKA unitPricingMeasure */
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
  isAdult?: boolean
  multipackQuantity?: number
  isBundle?: boolean
  shippingLabel?: "perishable" | "oversized" | "fragile"
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
  attributeValues?: MarshalledSkuAttributeValues
  /**
   * A `Sku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `Skus`.
   * @required
   */
  taxonomyTerms?: PrimaryKey[]
  imageGroups?: PrimaryKey[]
}

export interface Sku extends BaseSku {
  /** A `Sku` may have exactly one `AttributeValue` per `Attribute`. */
  attributeValues?: SkuAttributeValues
  /**
   * A `Sku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `Skus`.
   * @required
   */
  taxonomyTerms?: TaxonomyTerm[]
  imageGroups?: ImageGroup[]
}
