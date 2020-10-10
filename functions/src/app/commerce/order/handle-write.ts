import upsertPaymentIntent from "@funk/api/commerce/order/upsert-payment-intent"
import createWriteHandler from "@funk/functions/helpers/listen/create-write-handler"
import { ORDERS } from "@funk/model/commerce/order/order"

export default createWriteHandler(ORDERS, upsertPaymentIntent)
