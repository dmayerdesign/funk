import syncProduct from "@funk/api/core/commerce/sku/sync-product"
import createWriteHandler from "@funk/api/plugins/cloud-function/listen/create-write-handler"
import { SKUS } from "@funk/model/commerce/sku/sku"

export default createWriteHandler(SKUS, syncProduct)
