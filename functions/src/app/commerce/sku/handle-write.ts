import handleWrite from '@funk/api/commerce/product/sku/handle-write'
import createWriteHandler from '@funk/functions/helpers/listen/create-write-handler'
import { SKUS } from '@funk/model/commerce/product/sku/sku'

export default createWriteHandler(
  SKUS,
  handleWrite,
)
