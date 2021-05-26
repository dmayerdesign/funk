import upsertPaymentIntent from "@funk/commerce/order/application/internal/behaviors/upsert-payment-intent"
import { ORDERS } from "@funk/commerce/order/model/order"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(ORDERS, async (change, context) => {
  try {
    return await upsertPaymentIntent(change, context)
  } catch (error) {
    console.warn(error)
  }
})
