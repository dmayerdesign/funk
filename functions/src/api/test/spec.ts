import { FIRE_PROJECT_ID, FUNCTIONS_REGION } from '@funk/testing/config'
import Supertest from 'supertest'
const supertest = Supertest(
  `https://${FUNCTIONS_REGION}-${FIRE_PROJECT_ID}.cloudfunctions.net`
)

describe('shop', () =>
{
  it('should set a secret', () => supertest
    .post('/testSetSecret')
    .send({})
    .expect(200)
  )
})
