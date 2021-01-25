import { Customer } from "@funk/commerce/customer/domain/customer"
import { Cart, Status } from "@funk/commerce/order/domain/order"
import createUid from "@funk/helpers/create-uid"

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
