import { Product } from '@funk/shared/contracts/product/product'
import * as assert from 'assert'
import * as Supertest from 'supertest'
import { FIRE_PROJECT_ID, FUNCTIONS_REGION } from '../../../config/config.development'
const supertest = Supertest(
  `https://${FUNCTIONS_REGION}-${FIRE_PROJECT_ID}.cloudfunctions.net`
)

describe('shop', () => {
  it('should calculate tax for an order', () => supertest
    .post('/orderCalculateTax')
    .send({
      products: [
        { computedPrice: { amount: 1000, currency: 'USD' } }
      ] as Product[]
    })
    .expect(200)
    .then((response) => assert.deepEqual(
      response.body,
      [{ amount: 1060, currency: 'USD' }]
    ))
  )
})
