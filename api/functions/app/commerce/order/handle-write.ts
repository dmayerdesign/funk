import upsertPaymentIntent from "@funk/api/core/commerce/order/upsert-payment-intent"
import createWriteHandler from "@funk/api/plugins/cloud-function/listen/create-write-handler"
import { ORDERS } from "@funk/model/commerce/order/order"

export default createWriteHandler(ORDERS, upsertPaymentIntent)
