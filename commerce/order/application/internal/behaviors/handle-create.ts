import updateByIdImpl, {
  UpdateById,
} from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { Order } from "@funk/commerce/order/model/order"
import createUid from "@funk/helpers/create-uid"

export function construct(updateById: UpdateById) {
  return async function (
    snapshot: FirebaseFirestore.DocumentSnapshot<Order>,
  ): Promise<void> {
    await updateById(snapshot.data()!.id, {
      idempotencyKey: createUid(),
    })
  }
}

export default construct(updateByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
