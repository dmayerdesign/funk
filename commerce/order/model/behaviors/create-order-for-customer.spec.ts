import { Customer } from "@funk/commerce/customer/model/customer"
import createOrderForCustomer from "@funk/commerce/order/model/behaviors/create-order-for-customer"
import { Cart, Status } from "@funk/commerce/order/model/order"

describe("createOrderForCustomer", () => {
  it("should create a new order given a customer", () => {
    const customer = { firstName: "Test" } as Customer
    const orderData = { slug: "test-order" } as Cart

    const order = createOrderForCustomer(customer, orderData)

    expect(order.status).toBe(Status.CART)
    expect(order.customer).toEqual(customer)
    expect(order.slug).toBe(orderData.slug)
  })
})
