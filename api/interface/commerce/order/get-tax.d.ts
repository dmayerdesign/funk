import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import { Populate } from "@funk/api/commerce/order/populate"
import { GetTotalBeforeTaxAndShipping } from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { GetTaxRateForPostalCode } from "@funk/plugins/tax/actions/get-tax-rate-for-postal-code"

export const construct: (
  getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping,
  populate: Populate,
  getTaxRateForPostalCode: GetTaxRateForPostalCode
) => typeof getTax

export default function getTax(order: Order | MarshalledOrder): Promise<Price>

export type GetTax = ReturnType<typeof construct>
