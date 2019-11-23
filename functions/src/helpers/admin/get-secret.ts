import { FIRE_PROJECT_ID } from '@funk/config'
import { EncryptedSecret } from '@funk/model/secret/encrypted-secret'
import { v1 } from '@google-cloud/kms'
import { firestore } from 'firebase-admin'

export default async function(secretKey: string): Promise<string>
{
  const client = new v1.KeyManagementServiceClient()
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
    const encryptedSecretBuffer = Buffer.from(encryptedSecret.value, 'utf8')
    const [ result ] = await client.decrypt({
      name: keyName,
      ciphertext: encryptedSecretBuffer,
    })
    return result.plaintext.toString('utf8')
  }

  return ''
}
