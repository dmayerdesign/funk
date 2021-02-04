import { MarshalledOrder, ORDERS } from "@funk/commerce/order/model/order"
import createUid from "@funk/helpers/create-uid"
import updateByIdImpl from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(updateById: typeof updateByIdImpl) {
  return async function (
    snapshot: FirebaseFirestore.DocumentSnapshot<MarshalledOrder>,
  ): Promise<void> {
    await updateById<MarshalledOrder>(ORDERS, snapshot.data()!.id, {
      idempotencyKey: createUid(),
    })
  }
}

export default construct(updateByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
