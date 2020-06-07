import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { MarshalledOrder } from "@funk/model/commerce/order/order"
import getSecret from "@funk/api/admin/get-secret"
import { Populate } from "@funk/plugins/persistence/actions/populate"
import getProductForSku from "@funk/api/commerce/product/get-product-for-sku"
import ignoringKeys from "@funk/functions/helpers/listen/ignoring-keys"
import updateById from "@funk/plugins/persistence/actions/update-by-id"
import { construct as constructCreatePaymentIntent } from
  "@funk/plugins/payment/actions/create-payment-intent"
import { construct as constructUpdatePaymentIntent } from
  "@funk/plugins/payment/actions/update-payment-intent"
import { construct as constructGetTotalBeforeTaxAndShipping } from
  "@funk/model/commerce/order/actions/get-total-before-tax-and-shipping"
import { construct as constructGetTax } from
  "@funk/model/commerce/order/actions/get-tax"

declare const handleWrite: ChangeHandler<MarshalledOrder>

export const construct: (deps?: {
  constructGetTotalBeforeTaxAndShipping: typeof constructGetTotalBeforeTaxAndShipping
  constructGetTax: typeof constructGetTax
  getSecret: typeof getSecret
  populate: Populate
  getProductForSku: typeof getProductForSku
  ignoringKeys: typeof ignoringKeys
  constructCreatePaymentIntent: typeof constructCreatePaymentIntent
  constructUpdatePaymentIntent: typeof constructUpdatePaymentIntent
  updateById: typeof updateById
}) => typeof handleWrite

export default handleWrite

export type HandleWrite = ReturnType<typeof construct>
