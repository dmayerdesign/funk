import syncProduct from "@funk/api/commerce/sku/sync-product"
import createWriteHandler from "@funk/functions/helpers/listen/create-write-handler"
import { SKUS } from "@funk/model/commerce/sku/sku"

export default createWriteHandler(SKUS, syncProduct)
