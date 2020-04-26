import { construct as constructGetTax } from '@funk/model/commerce/order/actions/get-tax'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import getTaxRateForPostalCodeImpl from
  '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

describe('getTax', () =>
{
  const createGetProductForSku = () => async (_sku: Sku) => expect.any(Object)
  const createGetTaxRateForPostalCodeStub = (): typeof getTaxRateForPostalCodeImpl =>
    async () => 0.06

  it('should get tax for an order', async (done) =>
  {
    const ORDER = {
      customer: {
        shippingAddress: {
          zip: '00000',
        },
      },
      skus: [
        { price: { amount: 500, currency: CurrencyCode.USD } },
        { price: { amount: 500, currency: CurrencyCode.USD } },
      ],
    } as DbDocumentInput<PopulatedOrder>
    const getTaxRateForPostalCode = jasmine.createSpy(
      'getTaxRateForPostalCode', createGetTaxRateForPostalCodeStub()).and.callThrough()
    const getProductForSku = createGetProductForSku()
    const getTax = constructGetTax({
      getTaxRateForPostalCode,
      getProductForSku,
    })

    const response = await getTax(ORDER)

    expect(response.amount).toBe(60)
    expect(getTaxRateForPostalCode).toHaveBeenCalledTimes(1)
    done()
  })
})
