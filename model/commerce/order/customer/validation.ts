import { Customer } from "@funk/model/commerce/order/customer/customer"
import { InvalidOrderError } from "@funk/model/commerce/order/validation"

/** @throws InvalidOrderError */
export function validateForOrder(customer: Customer): void {
  const requiredKeys: (keyof Customer)[] = [
    "email",
    "lastName",
    "billingAddress",
  ]
  if (requiredKeys.some((key) => customer[key] == null)) {
    throw new InvalidOrderError(
      "Order.customer is missing the following required fields:\n" +
        requiredKeys.filter((key) => customer[key] == null).join(", ")
    )
  }
}
