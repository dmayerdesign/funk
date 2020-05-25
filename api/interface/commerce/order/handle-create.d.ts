import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { DocumentSnapshot } from "@funk/plugins/persistence/document-snapshot"

export default function(snapshot: DocumentSnapshot<MarshalledOrder>): Promise<void>
