import { Order } from '@funk/model/commerce/order/order'
import { construct } from '@funk/plugins/shipment/actions/get-shipping-rates'

describe('getShippingRates', () =>
{
  it('should get shipping rates for an order', async () =>
  {
    // TODO:
    // Fetch rates using the combined weight of all the Skus.
    const GOOD_ORDER = {} as Order
    const getShippingRates = construct()
    expect(await getShippingRates(GOOD_ORDER)).toEqual([])
  })
})
