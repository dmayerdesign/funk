import { FUNCTIONS_BASE_URL } from '@funk/config'
import httpClient from '@funk/functions/helpers/http/client'
import { createAllInclusiveTenPercentDiscount, createSku } from
  '@funk/model/commerce/discount/actions/spec'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { StatusCode } from '@funk/model/http/status-code'
import { customerWithBadPostalCode, customerWithGoodPostalCode } from
  '@funk/plugins-spec/tax/actions/get-tax-rate-for-postal-code.spec'

describe('shop', () =>
{
  it('should return a BadRequestError ', async (done) =>
  {
    const response = await httpClient
      .post(`${FUNCTIONS_BASE_URL}/commerceOrderGetTax`, {
        skus: [ createSku() ],
        customer: customerWithBadPostalCode(),
      } as DbDocumentInput<PopulatedOrder>)
    expect(response.status).toBe(StatusCode.BAD_REQUEST)
    done()
  })
  it('should get the tax amount for an order, after discounts', async (done) =>
  {
    const response = await httpClient
      .post(`${FUNCTIONS_BASE_URL}/commerceOrderGetTax`, {
        skus: [ createSku() ],
        customer: customerWithGoodPostalCode(),
        discounts: [
          createAllInclusiveTenPercentDiscount({}),
        ],
      } as DbDocumentInput<PopulatedOrder>)

    expect(response.status).toBe(StatusCode.OK)
    expect(response.data).toEqual(
      { amount: Math.ceil((1000 - 100) * (6 / 100)), currency: 'USD' }
    )
    done()
  })
})
