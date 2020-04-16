import { FUNCTIONS_BASE_URL } from '@funk/config'
import { Discount } from '@funk/model/commerce/discount/discount'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import * as assert from 'assert'
import Supertest from 'supertest'
const supertest = Supertest(FUNCTIONS_BASE_URL)

xdescribe('shop', () =>
{
  it('should get the tax amount for an order', () =>
    supertest
      .post('/commerceOrderGetTax')
      .send({
        skus: goodSkus(),
        discounts: [ goodDiscount() ],
        customer: goodCustomer(),
      } as DbDocumentInput<PopulatedOrder>)
      .expect(200)
      .then((response) => assert.deepEqual(
        response.body,
        [{ amount: 300, currency: 'USD' }],
      )))
})

function goodSkus(): Sku[]
{
  return [
    { id: 'test_sku_id_1',
      price: { amount: 1010, currency: 'USD' },
      taxonomyTerms: [ 'tax_term_id_1' ] },
    { id: 'test_sku_id_2',
      price: { amount: 1000, currency: 'USD' },
      taxonomyTerms: [ 'tax_term_id_2' ] },
    { id: 'test_sku_id_3',
      price: { amount: 1000, currency: 'USD' },
      taxonomyTerms: [ 'tax_term_id_3' ] },
    { id: 'test_sku_id_4',
      price: { amount: 1000, currency: 'USD' },
      taxonomyTerms: [ 'tax_term_id_EXCLUDE_FROM_DISCOUNT' ] },
    { id: 'test_sku_id_EXCLUDE_FROM_DISCOUNT',
      price: { amount: 1000, currency: 'USD' } },
  ] as Sku[]
}

function goodDiscount(): Discount
{
  return {
    id: 'test-discount',
    type: 'sku',
    total: { amount: 10, currency: CurrencyCode.USD },
    includes: {
      skus: [
        'test_sku_id_2',
        'test_sku_id_4',
        'test_sku_id_EXCLUDE_FROM_DISCOUNT',
      ],
      taxonomyTerms: [
        'tax_term_id_1',
        'tax_term_id_2',
        'tax_term_id_3',
      ],
    },
    excludes: {
      skus: [
        'test_sku_id_EXCLUDE_FROM_DISCOUNT',
      ],
      taxonomyTerms: [
        'tax_term_id_EXCLUDE_FROM_DISCOUNT',
      ],
    },
    startAt: Date.now() - 60000000,
    endAt: Date.now() + 60000000,
  }
}

function goodCustomer(): Customer
{
  return {
    billingAddress: {
      zip: '32805',
    },
  } as Customer
}
