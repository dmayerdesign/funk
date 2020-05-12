import { MarshalledOrder } from '@funk/model/commerce/order/order'
import { Price } from '@funk/model/commerce/price/price'

export default function(marshalledOrder: MarshalledOrder): Promise<Price>
