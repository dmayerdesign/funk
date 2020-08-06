import { CLOUD_PROJECT_ID } from "@funk/config"
import getConfigImpl from "@funk/functions/helpers/runtime/get-config"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import { EncryptedSecret } from "@funk/model/secret/encrypted-secret"
import setByIdImpl from "@funk/api/plugins/persistence/behaviors/set-by-id"
import { v1 } from "@google-cloud/kms"
import { ClientOptions } from "google-gax"

export interface Options {
  key: string
  value: string
}

export function construct(
  getConfig = getConfigImpl,
  setById = setByIdImpl,
  createKmsClient = (options?: ClientOptions) =>
    new v1.KeyManagementServiceClient(options)
)
{
  return async ({ key, value }: Options): Promise<void> =>
  {
    const { client_email, private_key } = JSON.parse(
      Buffer.from(getConfig().admin.serializedcredentials, "base64")
        .toString("utf8"))
    const client = createKmsClient({
      credentials: {
        client_email,
        private_key,
      },
    })
    const keyName = client.cryptoKeyPath(
      CLOUD_PROJECT_ID,
      "global",
      CLOUD_PROJECT_ID, // TODO: Rename key ring to 'primary'.
      "master"
    )

    const [ encryptResponse ] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(value, "utf8"),
    })

    const encryptedSecret: DbDocumentInput<EncryptedSecret> = {
      value: Buffer.from(encryptResponse.ciphertext!).toString("base64"),
    }
    await setById("vault", key, encryptedSecret)
  }
}

export default construct()

export type SetSecret = ReturnType<typeof construct>
