import { CLOUD_PROJECT_ID } from '@funk/config'
import getConfigImpl from '@funk/functions/helpers/runtime/get-config'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { store as storeImpl } from '@funk/plugins/persistence/server-store'
import { v1 } from '@google-cloud/kms'
import { ClientOptions } from 'google-gax'

export const construct = ({
  getConfig = getConfigImpl,
  store = storeImpl,
  createKmsClient = (options?: ClientOptions) =>
    new v1.KeyManagementServiceClient(options),
} = {}) =>
  async function(secretKey: string): Promise<string | undefined>
  {
    const { client_email, private_key } = JSON.parse(
      Buffer.from(getConfig().admin.serializedcredentials, 'base64').toString('utf8'),
    )
    const client = createKmsClient({
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

export default construct()
