import { Discount } from '@funk/model/commerce/discount/discount'
import { CurrencyCode } from '@funk/model/commerce/price/currency-code'
import { ProductSku } from '@funk/model/commerce/product/product-sku'
import * as assert from 'assert'
import Supertest from 'supertest'
import { FIRE_PROJECT_ID, FUNCTIONS_REGION } from '../../../../config/config.development'
const supertest = Supertest(
  `https://${FUNCTIONS_REGION}-${FIRE_PROJECT_ID}.cloudfunctions.net`
)

describe('shop', () => {
  it('should calculate tax for an order', () => supertest
    .post('/orderCalculateTax')
    .send({
      productSkus: [
        { id: 'test_sku_id_1', price: { amount: 1010, currency: 'USD' },
          taxonomyTerms: [ 'tax_term_id_1' ] },
        { id: 'test_sku_id_2', price: { amount: 1000, currency: 'USD' } },
        { id: 'test_sku_id_3', price: { amount: 1000, currency: 'USD' },
          taxonomyTerms: [ 'tax_term_id_2' ] },
      ] as ProductSku[],
      discounts: [
        {
          type: 'product',
          total: { amount: 10, currency: CurrencyCode.USD },
          includes: {
            productSkus: [ 'test_sku_id_2', 'test_sku_id_3' ],
            taxonomyTerms: [ 'tax_term_id_1' ],
          },
          excludes: {
            productSkus: [ 'test_sku_id_2' ],
            taxonomyTerms: [ 'tax_term_id_2' ],
          }
        }
      ] as Discount[]
    })
    .expect(200)
    .then((response) => assert.deepEqual(
      response.body,
      [{ amount: 180, currency: 'USD' }]
    ))
  )
})
