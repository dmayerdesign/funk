import { Entity } from '../data-access/entity'
import { Price } from '../price/price'
import { Product } from '../product/product'
import { TaxonomyTerm } from '../taxonomy-term/taxonomy-term'

export interface DiscountExceptions {
    products: Product[]
    taxonomyTerms: TaxonomyTerm[]
}

export interface Discount extends Entity {
    code: string
    total: Price
    percentage: number // `20` for a 20% discount
    freeShipping: boolean
    includes?: DiscountExceptions
    excludes?: DiscountExceptions
}
