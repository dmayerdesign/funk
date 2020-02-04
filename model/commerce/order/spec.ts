import { construct as constructGetTax } from '@funk/model/commerce/order/actions/get-tax'
import { createOrder } from '@funk/model/commerce/order/stubs'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'

describe('shop', () =>
{
  it('should get the tax amount for an order', async (done) =>
  {
    const mockGetTaxRateForPostalCode = async (input: any) =>
      input.postalCode === '32805' ? 0.06 : 0
    const tax = await constructGetTax(mockGetTaxRateForPostalCode)({
      order: createOrder(),
      postalCode: '32805',
      getProductForSku: async (_sku: Sku) => ({
        taxonomyTerms: [],
      } as unknown as Product),
    })

    expect(tax).toEqual({ amount: 60, currency: 'USD' })

    done()
  })
})
