import syncProduct from "@funk/commerce/sku/application/internal/behaviors/sync-product"
import { SKUS } from "@funk/commerce/sku/domain/sku"
import createWriteHandler from "@funk/http/plugins/internal/cloud-function/behaviors/listen/create-write-handler"

export default createWriteHandler(SKUS, syncProduct)
