import auditOnWrite from "@funk/audit/application/internal/behaviors/on-write"
import { Product, PRODUCTS } from "@funk/commerce/product/model/product"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  PRODUCTS,
  auditOnWrite<Product>(`audit.${PRODUCTS}`),
)
