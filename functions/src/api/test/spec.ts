import { FUNCTIONS_BASE_URL } from '@funk/config'
import Supertest from 'supertest'
const supertest = Supertest(FUNCTIONS_BASE_URL)

xdescribe('shop', () =>
{
  it('should create a receipt', () => supertest
    .post('/testCreateReceipt')
    .send({})
    .expect(200)
  )
})
