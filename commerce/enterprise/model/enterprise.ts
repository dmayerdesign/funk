import { Price } from "@funk/commerce/price/model/price"
import { Organization } from "@funk/organization/model/organization"
import { Address } from "@funk/places/model/address"

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
  salesTaxNexusStates: string[]
}
