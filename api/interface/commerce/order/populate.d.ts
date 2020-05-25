import { MarshalledOrder, PopulatedOrder } from "@funk/model/commerce/order/order"

export default function(order: MarshalledOrder): Promise<PopulatedOrder>
