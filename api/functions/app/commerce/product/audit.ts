import auditOnWrite from "@funk/api/functions/helpers/audit/on-write"
import createWriteHandler from "@funk/api/plugins/cloud-function/listen/create-write-handler"
import { Product, PRODUCTS } from "@funk/model/commerce/product/product"

export default createWriteHandler(
  PRODUCTS,
  auditOnWrite<Product>(`audit.${PRODUCTS}`),
)
