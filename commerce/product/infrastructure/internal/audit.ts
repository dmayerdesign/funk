import auditOnWrite from "@funk/audit/helpers/internal/on-write"
import { Product, PRODUCTS } from "@funk/commerce/product/domain/product"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(
  PRODUCTS,
  auditOnWrite<Product>(`audit.${PRODUCTS}`),
)
