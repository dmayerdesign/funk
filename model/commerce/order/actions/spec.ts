import { construct } from '@funk/model/commerce/order/actions/get-tax'
import { Input as GetTotalBeforeTaxInput, Output as GetTotalBeforeTaxOutput } from
  '@funk/model/commerce/order/actions/get-total-before-tax'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import {
  Input as GetTaxRateForPostalCodeInput,
  Output as GetTaxRateForPostalCodeOutput,
} from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

const createGetProductForSku = () => async (_sku: Sku) => expect.any(Object)
const createGetTotalBeforeTax = () =>
  async (_input: GetTotalBeforeTaxInput) => ({
    amount: 1000,
    currency: 'USD',
  }) as GetTotalBeforeTaxOutput
const createGetTaxRateForPostalCode = () =>
  async (_input: GetTaxRateForPostalCodeInput) => 0.06 as GetTaxRateForPostalCodeOutput

describe('getTax', () =>
{
  it('should get tax for an order', async (done) =>
  {
    const getTotalBeforeTax = jasmine.createSpy(
      'getTotalBeforeTax', createGetTotalBeforeTax()).and.callThrough()
    const getTaxRateForPostalCode = jasmine.createSpy(
      'getTaxRateForPostalCode', createGetTaxRateForPostalCode()).and.callThrough()
    const getProductForSku = createGetProductForSku()
    const getTax = construct({ getTotalBeforeTax, getTaxRateForPostalCode })
    const ORDER = {} as DbDocumentInput<PopulatedOrder>
    const POSTAL_CODE = '00000'

    const response = await getTax({
      order: ORDER,
      postalCode: POSTAL_CODE,
      getProductForSku,
    })

    expect(response.amount).toBe(60)
    expect(getTotalBeforeTax).toHaveBeenCalledTimes(1)
    expect(getTaxRateForPostalCode).toHaveBeenCalledTimes(1)
    done()
  })
})
