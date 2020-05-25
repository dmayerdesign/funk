import auditOnWrite from "@funk/functions/helpers/audit/on-write"
import createWriteHandler from "@funk/functions/helpers/listen/create-write-handler"
import { Order, ORDERS } from "@funk/model/commerce/order/order"

export default createWriteHandler(ORDERS, auditOnWrite<Order>(`audit.${ORDERS}`))
