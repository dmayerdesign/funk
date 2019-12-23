import { FIRE_PROJECT_ID } from '@funk/config'
import createGuardedFunction from '@funk/functions/helpers/http/create-guarded-function'
import getConfig from '@funk/functions/helpers/runtime/get-config'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { UserRole } from '@funk/model/auth/user-role'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { SetSecretInput } from '@funk/model/secret/set-secret-input'
import { v1 } from '@google-cloud/kms'
import { firestore } from 'firebase-admin'

export default createGuardedFunction(
  [ UserRole.SUPER, UserRole.OWNER ],
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
      FIRE_PROJECT_ID,
      'global',
      FIRE_PROJECT_ID, // TODO: Rename key ring to 'primary'.
      'master'
    )

    const [ encryptResponse ] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(secretValue, 'utf8'),
    })

    const encryptedSecret: DbDocumentInput<EncryptedSecret> = {
      value: encryptResponse.ciphertext.toString('base64'),
    }

    await firestore().doc(`/vault/${secretKey}`).set(encryptedSecret)
  })
