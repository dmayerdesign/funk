import { AttributeValue } from "@funk/attribute/model/attribute-value"
import { Price } from "@funk/commerce/price/model/price"
import { Inventory } from "@funk/commerce/sku/model/inventory"
import { ImageGroup } from "@funk/content/image-group/model/image-group"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"
import { Weight } from "@funk/things/model/weight/weight"
import { Duration } from "@funk/time/model/duration"

export const SKUS = "commerce.skus"

/**
 * This schema is largely based on Google's product data spec.
 * @see https://support.google.com/merchants/answer/7052112?hl=en&ref_topic=6324338
 */
export interface Sku extends DatabaseDocument {
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

  /** A `Sku` may have exactly one `AttributeValue` per `Attribute`. */
  attributeValues: AttributeValue[]
  /**
   * A `Sku` may have multiple `TaxonomyTerms` per `Taxonomy`.
   * This field should only store terms which are not present in the associated `Product`
   * and which do not apply to all sibling `Skus`.
   */
  taxonomyTerms: TaxonomyTerm[]
  imageGroups: ImageGroup[]
}
