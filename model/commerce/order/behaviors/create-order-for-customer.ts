import createUid from "@funk/helpers/create-uid"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { Cart, Status } from "@funk/model/commerce/order/order"

export default function (
  customer: Partial<Customer>,
  orderData?: Partial<Cart>,
): Cart {
  return {
    id: createUid(),
    status: Status.CART,
    customer,
    skus: [],
    skuQuantityMap: {},
    ...orderData,
  }
}
