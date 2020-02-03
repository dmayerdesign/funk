import { CLOUD_PROJECT_ID } from '@funk/config'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import authenticateForRoles from '@funk/functions/helpers/identity/authenticate-for-roles'
import getConfig from '@funk/functions/helpers/runtime/get-config'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { UserRole } from '@funk/model/auth/user-role'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { SetSecretInput } from '@funk/model/secret/set-secret-input'
import { store } from '@funk/plugins/db/store'
import { v1 } from '@google-cloud/kms'

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER ]),
  async ({ body }: RequestWithBody<SetSecretInput>): Promise<void> =>
  {
    const secretKey: string = body.secretKey
    const secretValue: string = body.secretValue

    const { client_email, private_key } = JSON.parse(
      Buffer.from(getConfig().admin.serializedcredentials, 'base64')
        .toString('utf8')
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
      CLOUD_PROJECT_ID, // TODO: Rename key ring to 'primary'.
      'master'
    )

    const [ encryptResponse ] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(secretValue, 'utf8'),
    })

    const encryptedSecret: DbDocumentInput<EncryptedSecret> = {
      value: encryptResponse.ciphertext.toString('base64'),
    }

    await store().doc(`/vault/${secretKey}`).set(encryptedSecret)
  })
