import handleWrite from "@funk/api/commerce/order/handle-write"
import createWriteHandler from "@funk/functions/helpers/listen/create-write-handler"
import { ORDERS } from "@funk/model/commerce/order/order"

export default createWriteHandler(
  ORDERS,
  handleWrite
)
