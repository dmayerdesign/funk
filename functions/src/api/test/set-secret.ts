import createFunction from '@funk/functions/helpers/http/create-function'
import { FIRE_PROJECT_ID } from '@funk/testing/config'
import * as kms from '@google-cloud/kms'

// ***************** vvv IMPORTANT vvv *******************
// TODO: Change to `createGuardedFunction` for SUPER role.
// ***************** ^^^ IMPORTANT ^^^ *******************
export default createFunction(async () =>
{
  const locationId = 'global'
  const keyName = ''

  // Instantiates an authorized client.
  const client = new kms.KeyManagementServiceClient()

  async function getKeyRing(name: string): Promise<kms.v1.KeyRing | undefined>
  {
    const parent = client.locationPath(FIRE_PROJECT_ID, locationId)
    const keyRing = await client.listKeyRings({ parent }).then(
      (keyRings) => keyRings.find((_keyRing) => _keyRing.name === name)
    )
    if (keyRing) return keyRing
    else
    {
      console.log(`Key ring not found.`)
      return undefined
    }
  }

  // `projects/${FIRE_PROJECT_ID}/locations/${locationId}/keyRings/test/cryptoKeys/${keyName}`
  console.log('key ring "test":', JSON.stringify(await getKeyRing('test')))
})
