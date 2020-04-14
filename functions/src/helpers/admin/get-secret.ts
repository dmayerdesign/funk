import { CLOUD_PROJECT_ID } from '@funk/config'
import getConfig from '@funk/functions/helpers/runtime/get-config'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { GetSecretInput } from '@funk/model/secret/get-secret-input'
import { store } from '@funk/plugins/db/store'
import { v1 } from '@google-cloud/kms'

export default async function ({ secretKey }: GetSecretInput): Promise<string | undefined>
{
  const { client_email, private_key } = JSON.parse(
    Buffer.from(getConfig().admin.serializedcredentials, 'base64').toString('utf8'),
  )
  const client = new v1.KeyManagementServiceClient({
    credentials: {
      client_email,
      private_key,
    },
  })
  const keyName = client.cryptoKeyPath(
    CLOUD_PROJECT_ID,
    'global',
    CLOUD_PROJECT_ID,
    'master',
  )
  const encryptedSecret = (await store()
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
    return result.plaintext?.toString()
  }

  return undefined
}
