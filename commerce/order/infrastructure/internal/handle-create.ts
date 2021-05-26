import handleCreate from "@funk/commerce/order/application/internal/behaviors/handle-create"
import { Order, ORDERS } from "@funk/commerce/order/model/order"
import createCreateHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-create-handler"
import { DocumentSnapshot } from "@funk/persistence/application/internal/document-snapshot"

export default createCreateHandler(ORDERS, async (snapshot) => {
  try {
    return handleCreate(snapshot as DocumentSnapshot<Order>)
  } catch (error) {
    console.warn(error)
  }
})
