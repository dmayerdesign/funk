import { FIRE_PROJECT_ID } from '@funk/config'
import createGuardedFunction from '@funk/functions/helpers/http/create-guarded-function'
import { UserRole } from '@funk/model/auth/user-role'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { v1 } from '@google-cloud/kms'
import { firestore } from 'firebase-admin'

export default createGuardedFunction(
  [ UserRole.SUPER, UserRole.OWNER ],
  async ({ body }): Promise<void> =>
  {
    const secretKey: string = body['secretKey']
    const secretValue: string = body['secretValue']

    const client = new v1.KeyManagementServiceClient()
    const keyName = client.cryptoKeyPath(
      FIRE_PROJECT_ID,
      'global',
      FIRE_PROJECT_ID,
      'master'
    )

    const [ encryptResponse ] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(secretValue, 'utf8'),
    })

    const encryptedSecret: EncryptedSecret = {
      value: encryptResponse.ciphertext.toString('utf8'),
    }

    await firestore().doc(`/vault/${secretKey}`).set(encryptedSecret)
  })
