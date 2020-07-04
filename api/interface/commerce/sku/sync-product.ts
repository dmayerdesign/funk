import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { List } from "@funk/plugins/persistence/actions/list"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"

// TODO: rename from "handle-write" to something semantic.
declare const syncProduct: ChangeHandler<MarshalledSku>

export declare const construct: (
  list?: List,
  updateById?: UpdateById
) => typeof syncProduct

export default syncProduct

export type SyncProduct = ReturnType<typeof construct>
