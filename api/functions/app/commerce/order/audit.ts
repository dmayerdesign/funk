import auditOnWrite from "@funk/api/functions/helpers/audit/on-write"
import createWriteHandler from "@funk/api/plugins/cloud-function/listen/create-write-handler"
import { Order, ORDERS } from "@funk/model/commerce/order/order"

export default createWriteHandler(
  ORDERS,
  auditOnWrite<Order>(`audit.${ORDERS}`)
)
