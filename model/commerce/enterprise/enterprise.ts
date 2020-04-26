import { Address } from '@funk/model/address/address'
import { Price, PricePerUnitWeight } from '@funk/model/commerce/price/price'
import { Organization } from '@funk/model/organization/organization'

export enum ShippingCostStrategy {
    FLAT_RATE = 'FLAT_RATE',
    WEIGHT = 'WEIGHT',
}

export interface Enterprise extends Organization {
    type: 'enterprise'
    shippingAddress: Address
    billingAddress: Address
    addSalesTax?: boolean
    shippingCostStrategy: ShippingCostStrategy
    shippingFlatRate?: Price
    shippingWeightRate?: PricePerUnitWeight
}
