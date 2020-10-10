import handleCreate from "@funk/api/commerce/order/handle-create"
import createCreateHandler from "@funk/functions/helpers/listen/create-create-handler"
import { ORDERS } from "@funk/model/commerce/order/order"

export default createCreateHandler(ORDERS, handleCreate)
