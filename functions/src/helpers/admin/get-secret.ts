import { FIRE_PROJECT_ID } from '@funk/config'
import getConfig from '@funk/functions/helpers/runtime/get-config'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { GetSecretInput } from '@funk/model/secret/get-secret-input'
import { v1 } from '@google-cloud/kms'
import { firestore } from 'firebase-admin'

export default async function ({ secretKey }: GetSecretInput): Promise<string>
{
  const { client_email, private_key } = JSON.parse(
    Buffer.from(getConfig().admin.serializedcredentials, 'base64')
      .toString('utf8'),
  )
  const client = new v1.KeyManagementServiceClient({
    credentials: {
      client_email,
      private_key,
    },
  })
  const keyName = client.cryptoKeyPath(
    FIRE_PROJECT_ID,
    'global',
    FIRE_PROJECT_ID,
    'master',
  )
  const encryptedSecret = (await firestore()
    .doc(`/vault/${secretKey}`)
    .get())
    .data() as EncryptedSecret | undefined

  if (encryptedSecret)
  {
    const encryptedSecretBuffer = Buffer.from(encryptedSecret.value, 'base64')
    const [ result ] = await client.decrypt({
      name: keyName,
      ciphertext: encryptedSecretBuffer,
    })
    return result.plaintext.toString('utf8')
  }

  return ''
}
