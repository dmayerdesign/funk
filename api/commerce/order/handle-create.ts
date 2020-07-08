import createUid from "@funk/helpers/create-uid"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import updateByIdImpl from "@funk/api/plugins/persistence/actions/update-by-id"
import { DocumentSnapshot } from "@funk/api/plugins/persistence/document-snapshot"

export function construct(updateById = updateByIdImpl)
{
  return async function(snapshot: DocumentSnapshot<MarshalledOrder>): Promise<void>
  {
    await updateById<MarshalledOrder>(ORDERS, snapshot.data()!.id, {
      idempotencyKey: createUid(),
    })
  }
}

export default construct()

export type HandleCreate = ReturnType<typeof construct>
