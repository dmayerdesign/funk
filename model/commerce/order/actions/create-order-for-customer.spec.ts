import createOrderForCustomer from
  '@funk/model/commerce/order/actions/create-order-for-customer'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Order, Status } from '@funk/model/commerce/order/order'

describe('createOrderForCustomer', () =>
{
  it('should create a new order given a customer', () =>
  {
    const customer = { firstName: 'Test' } as Customer
    const orderData = { slug: 'test-order' } as Order

    const order = createOrderForCustomer(customer, orderData)

    expect(order.id).toBeTruthy()
    expect(order.status).toBe(Status.CART)
    expect(order.customer).toEqual(customer)
    expect(order.skus).toEqual([])
    expect(order.slug).toBe('test-order')
  })
})
