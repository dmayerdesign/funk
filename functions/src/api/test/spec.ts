import { FUNCTIONS_BASE_URL } from '@funk/testing/config'
import Supertest from 'supertest'
const supertest = Supertest(FUNCTIONS_BASE_URL)

describe('shop', () =>
{
  it('should set a secret', () => supertest
    .post('/testSetSecret')
    .send({})
    .expect(200)
  )
})
