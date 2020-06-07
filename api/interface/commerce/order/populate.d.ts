import { MarshalledOrder, PopulatedOrder } from "@funk/model/commerce/order/order"
import { Populate as ExecutePopulate } from "@funk/plugins/persistence/actions/populate"

export function construct(executePopulate: ExecutePopulate): typeof populate

export default function populate(order: MarshalledOrder): Promise<PopulatedOrder>

export type Populate = ReturnType<typeof construct>
