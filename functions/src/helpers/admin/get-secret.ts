import { FIRE_PROJECT_ID } from '@funk/config'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { v1 } from '@google-cloud/kms'
import { firestore } from 'firebase-admin'
import getConfig from '../../helpers/runtime/get-config'

export default async function(secretKey: string): Promise<string>
{
  const { client_email, private_key } = JSON.parse(
    Buffer.from(getConfig().admin.serializedcredentials, 'base64')
      .toString('utf8')
  )
  const client = new v1.KeyManagementServiceClient({
    credentials: {
      client_email,
      private_key,
    }
  })
  const keyName = client.cryptoKeyPath(
    FIRE_PROJECT_ID,
    'global',
    FIRE_PROJECT_ID,
    'master'
  )
  const encryptedSecret = (await firestore()
    .doc(`/vault/${secretKey}`)
    .get())
    .data() as EncryptedSecret | undefined

  if (encryptedSecret)
  {
    console.log('====> got encrypted secret', encryptedSecret)
    const encryptedSecretBuffer = Buffer.from(encryptedSecret.value, 'base64')
    const [ result ] = await client.decrypt({
      name: keyName,
      ciphertext: encryptedSecretBuffer,
    })
    console.log(`====> got decrypted secret`, result.plaintext.toString('utf8'))
    return result.plaintext.toString('utf8')
  }

  console.log(`====> couldn't decrypt`)

  return ''
}
