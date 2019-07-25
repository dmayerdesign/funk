import { Address } from '../address/address'
import { Price } from '../price/price'

export interface OrganizationRetailSettings {
    shippingAddress: Address
    billingAddress: Address
    salesTaxPercentage: number
    addSalesTax?: boolean
    shippingFlatRate?: Price
}
