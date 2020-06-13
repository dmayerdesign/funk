import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { Marshall as ExecuteMarshall } from "@funk/plugins/persistence/actions/marshall"

export declare function construct(executeMarshall: ExecuteMarshall): typeof marshall

declare function marshall(order: Order): MarshalledOrder
export default marshall

export type Marshall = ReturnType<typeof construct>
