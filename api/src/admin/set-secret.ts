import { CLOUD_PROJECT_ID } from '@funk/config'
import getConfigImpl from '@funk/functions/helpers/runtime/get-config'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { store as storeImpl } from '@funk/plugins/persistence/server-store'
import { v1 } from '@google-cloud/kms'
import { ClientOptions } from 'google-gax'

export interface Options {
  key: string
  value: string
}

export const construct = ({
  getConfig = getConfigImpl,
  store = storeImpl,
  createKmsClient = (options?: ClientOptions) =>
    new v1.KeyManagementServiceClient(options),
} = {}) =>
  async ({ key, value }: Options): Promise<void> =>
  {
    const { client_email, private_key } = JSON.parse(
      Buffer.from(getConfig().admin.serializedcredentials, 'base64')
        .toString('utf8'))
    const client = createKmsClient({
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

export default construct()
