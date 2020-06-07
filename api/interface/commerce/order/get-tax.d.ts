import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import getProductForSku from "@funk/api/commerce/product/get-product-for-sku"
import { Populate } from "@funk/plugins/persistence/actions/populate"
import { construct as constructGetTaxImpl } from "@funk/model/commerce/order/actions/get-tax"

export const construct: (deps?: {
  getProductForSku: typeof getProductForSku
  populate: Populate
  constructGetTax: typeof constructGetTaxImpl
}) => typeof getTax

export default function getTax(marshalledOrder: MarshalledOrder): Promise<Price>
