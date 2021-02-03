import { Price } from "@funk/commerce/price/domain/price"
import { Organization } from "@funk/organization/domain/organization"
import { Address } from "@funk/places/domain/address"

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
