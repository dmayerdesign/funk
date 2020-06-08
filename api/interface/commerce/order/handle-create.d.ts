import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"
import { UpdateById } from "@funk/plugins/persistence/actions/update-by-id"

export function construct(updateById: UpdateById): typeof handleCreate

export default function handleCreate(snapshot: DocumentSnapshot<MarshalledOrder>): Promise<void>

export type HandleCreate = ReturnType<typeof construct>
