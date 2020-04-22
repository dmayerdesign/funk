import callHttpsFunction from '@funk/functions/test/call-https-function'
import { createAllInclusiveTenPercentDiscount, createSku } from
  '@funk/model/commerce/discount/actions/spec'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { StatusCode } from '@funk/model/http/status-code'
import { customerWithBadPostalCode, customerWithGoodPostalCode } from
  '@funk/plugins-spec/tax/actions/get-tax-rate-for-postal-code.spec'

describe('shop', () =>
{
  xit('should get the tax amount for an order, after discounts', async (done) =>
  {
    const request = {
      skus: [ createSku() ],
      customer: customerWithGoodPostalCode(),
      discounts: [
        createAllInclusiveTenPercentDiscount({}),
      ],
    } as DbDocumentInput<PopulatedOrder>
    const response = await callHttpsFunction(
      'commerceOrderGetTax', request)

    expect(response.status).toBe(StatusCode.OK)
    expect(response.data).toEqual({
      amount: Math.ceil((1000 - 100) * (6 / 100)),
      currency: 'USD',
    })
    done()
  })
  it('should return a BadRequestError if no zip is provided', async (done) =>
  {
    const request = {
      skus: [ createSku() ],
      customer: customerWithBadPostalCode(),
    } as DbDocumentInput<PopulatedOrder>
    const response = await callHttpsFunction(
      'commerceOrderGetTax', request)

    expect(response.status).toBe(StatusCode.BAD_REQUEST)
    done()
  })
})
