import createUid from "@funk/helpers/create-uid"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import updateById from "@funk/plugins/persistence/actions/update-by-id"
import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"

export default async (snapshot: DocumentSnapshot<MarshalledOrder>) =>
{
  await updateById<MarshalledOrder>(ORDERS, snapshot.data()!.id, {
    idempotencyKey: createUid(),
  })
}
