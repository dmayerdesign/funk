import auditOnWrite from "@funk/audit/application/internal/behaviors/on-write"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  ORDERS,
  auditOnWrite<Order>(`audit.${ORDERS}`),
)
