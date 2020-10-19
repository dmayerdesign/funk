import handleCreate from "@funk/api/core/commerce/order/handle-create"
import createCreateHandler from "@funk/api/functions/helpers/listen/create-create-handler"
import { ORDERS } from "@funk/model/commerce/order/order"

export default createCreateHandler(ORDERS, handleCreate as any)
