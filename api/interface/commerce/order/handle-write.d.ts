import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { MarshalledOrder } from '@funk/model/commerce/order/order'

declare const handleWrite: ChangeHandler<MarshalledOrder>

export default handleWrite
