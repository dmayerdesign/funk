import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"

export declare function construct(updateById: UpdateById): typeof handleCreate

declare function handleCreate(snapshot: DocumentSnapshot<MarshalledOrder>): Promise<void>
export default handleCreate

export type HandleCreate = ReturnType<typeof construct>
