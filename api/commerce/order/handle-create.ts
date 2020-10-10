import updateByIdImpl from "@funk/api/plugins/persistence/behaviors/update-by-id"
import { DocumentSnapshot } from "@funk/api/plugins/persistence/document-snapshot"
import createUid from "@funk/helpers/create-uid"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"

export function construct(updateById: typeof updateByIdImpl) {
  return async function (
    snapshot: DocumentSnapshot<MarshalledOrder>
  ): Promise<void> {
    await updateById<MarshalledOrder>(ORDERS, snapshot.data()!.id, {
      idempotencyKey: createUid(),
    })
  }
}

export default construct(updateByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
