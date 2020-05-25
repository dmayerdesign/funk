import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { MarshalledSku } from "@funk/model/commerce/product/sku/sku"
import list from "@funk/plugins/persistence/actions/list"
import updateById from "@funk/plugins/persistence/actions/update-by-id"

declare const handleWrite: ChangeHandler<MarshalledSku>

declare const construct: (deps?: {
  list: typeof list
  updateById: typeof updateById
}) => typeof handleWrite

export { construct }
export default handleWrite
