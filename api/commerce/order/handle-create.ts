import createUid from '@funk/helpers/create-uid'
import { MarshalledOrder, ORDERS } from '@funk/model/commerce/order/order'
import { DocumentSnapshot } from '@funk/plugins/persistence/document-snapshot'
import { store } from '@funk/plugins/persistence/server-store'

export default async (snapshot: DocumentSnapshot<MarshalledOrder>) =>
{
  await store().collection(ORDERS)
    .doc(snapshot.data()!.id)
    .update({
      idempotencyKey: createUid(),
    } as Partial<MarshalledOrder>)
}
