import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export declare function construct(
  executePopulate: ExecutePopulate<Order, MarshalledOrder>): typeof populate

declare function populate(order: MarshalledOrder): Promise<Order>
export default populate

export type Populate = ReturnType<typeof construct>
