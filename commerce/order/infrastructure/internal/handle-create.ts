import handleCreate from "@funk/commerce/order/application/internal/behaviors/handle-create"
import { ORDERS } from "@funk/commerce/order/model/order"
import createCreateHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-create-handler"

export default createCreateHandler(ORDERS, handleCreate as any)
