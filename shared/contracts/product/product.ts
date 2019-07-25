import { AttributeValue } from '../attribute-value/attribute-value'
import { Attribute } from '../attribute/attribute'
import { Entity } from '../data-access/entity'
import { Dimensions } from '../dimensions/dimensions'
import { Image } from '../image/image'
import { Price } from '../price/price'
import { SimpleAttributeValue } from '../simple-attribute-value/simple-attribute-value'
import { TaxonomyTerm } from '../taxonomy-term/taxonomy-term'
import { Units } from '../units/units'
import { Weight } from '../weight/weight'

export interface Product extends Entity {
    // Aesthetic.
    name: string
    slug: string
    description: string
    featuredImages: Image[]
    images: Image[]

    // Organizational.
    sku: string
    isStandalone: boolean
    isParent: boolean
    parentSku: string
    parent: Product

    // Financial.
    price: Price
    priceRange: Price[]
    salePrice: Price
    salePriceRange: Price[]
    isOnSale: boolean
    variationSkus: string[]
    variations: Product[]
    isVariation: boolean
    isDefaultVariation: boolean

    // Attributes.
    /// Own attributes.
    attributeValues: AttributeValue[]
    simpleAttributeValues: SimpleAttributeValue[]
    /// Variation attributes.
    variableProperties: string[]
    variableAttributes: Attribute[]
    variableAttributeValues: AttributeValue[]
    variableSimpleAttributeValues: SimpleAttributeValue[]

    // Taxonomy.
    taxonomyTerms: TaxonomyTerm[]
    taxonomyTermSlugs: string[] // TODO: remove (used for convenience in HyzerShop migration for building image urls)

    // Shipping.
    units: Units
    dimensions: Dimensions
    shippingWeight: Weight
    netWeight: Weight

    // Additional tax.
    additionalTax: number

    // Sales.
    stockQuantity: number
    totalSales: number
    existsInStripe: boolean
}
