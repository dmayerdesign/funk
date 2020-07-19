import { Address } from "@funk/model/address/address"
import { Price } from "@funk/model/commerce/price/price"
import { Organization } from "@funk/model/organization/organization"

export enum ShippingCostStrategy {
  FLAT_RATE = "FLAT_RATE",
  WEIGHT = "WEIGHT",
}

export interface Enterprise extends Organization {
  type: "enterprise"
  shippingAddress: Address
  shippingFromAddress: Address
  billingAddress: Address
  shippingCostStrategy: ShippingCostStrategy
  shippingFlatRate?: Price
  /** @required */
  shippingCarriers?: string[]
  shippingCarrierDefault: string
  addSalesTax?: boolean
}
