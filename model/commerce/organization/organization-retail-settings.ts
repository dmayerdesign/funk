import { Address } from '@funk/model/address/address'
import { Price } from '@funk/model/commerce/price/price'

export interface OrganizationRetailSettings {
    shippingAddress: Address
    billingAddress: Address
    salesTaxPercentage: number
    addSalesTax?: boolean
    shippingFlatRate?: Price
}
