import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { List } from "@funk/plugins/persistence/actions/list"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"

declare const handleWrite: ChangeHandler<MarshalledSku>

export declare const construct: (deps?: {
  list: List
  updateById: UpdateById
}) => typeof handleWrite

export default handleWrite

export type HandleWrite = ReturnType<typeof construct>
