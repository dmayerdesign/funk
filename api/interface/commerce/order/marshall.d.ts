import { MarshalledOrder, PopulatedOrder } from "@funk/model/commerce/order/order"
import { Marshall as ExecuteMarshall } from "@funk/plugins/persistence/actions/marshall"

export function construct(executeMarshall: ExecuteMarshall): typeof marshall

export default function marshall(order: PopulatedOrder): MarshalledOrder

export type Marshall = ReturnType<typeof construct>
