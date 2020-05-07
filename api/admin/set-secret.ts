import { CLOUD_PROJECT_ID } from '@funk/config'
import getConfig from '@funk/functions/helpers/runtime/get-config'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { store } from '@funk/plugins/persistence/server-store'
import { v1 } from '@google-cloud/kms'

export interface Options {
  key: string
  value: string
}

export default async ({ key, value }: Options): Promise<void> =>
{
  const { client_email, private_key } = JSON.parse(
    Buffer.from(getConfig().admin.serializedcredentials, 'base64')
      .toString('utf8'))
  const client = new v1.KeyManagementServiceClient({
    credentials: {
      client_email,
      private_key,
    },
  })
  const keyName = client.cryptoKeyPath(
    CLOUD_PROJECT_ID,
    'global',
    CLOUD_PROJECT_ID, // TODO: Rename key ring to 'primary'.
    'master'
  )

  const [ encryptResponse ] = await client.encrypt({
    name: keyName,
    plaintext: Buffer.from(value, 'utf8'),
  })

  const encryptedSecret: DbDocumentInput<EncryptedSecret> = {
    value: Buffer.from(encryptResponse.ciphertext!)?.toString('base64'),
  }
  await store().doc(`/vault/${key}`).set(encryptedSecret)
}
