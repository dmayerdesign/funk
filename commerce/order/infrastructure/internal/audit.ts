import auditOnWrite from "@funk/audit/helpers/internal/on-write"
import { Order, ORDERS } from "@funk/commerce/order/domain/order"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  ORDERS,
  auditOnWrite<Order>(`audit.${ORDERS}`),
)
