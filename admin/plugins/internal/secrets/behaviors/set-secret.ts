import { EncryptedSecret } from "@funk/admin/plugins/internal/secrets/encrypted-secret"
import { CLOUD_PROJECT_ID } from "@funk/configuration"
import getConfigImpl from "@funk/http/plugins/internal/cloud-function/behaviors/runtime/get-config"
import setByIdImpl from "@funk/persistence/application/internal/behaviors/set-by-id"
import { DbDocumentInput } from "@funk/persistence/domain/database-document"
import { v1 } from "@google-cloud/kms"
import { ClientOptions } from "google-gax"

export interface Options {
  key: string
  value: string
}

export function construct(
  getConfig: typeof getConfigImpl,
  setById: typeof setByIdImpl,
  createKmsClient: (options?: ClientOptions) => v1.KeyManagementServiceClient,
) {
  return async ({ key, value }: Options): Promise<void> => {
    const { client_email, private_key } = JSON.parse(
      Buffer.from(getConfig().admin.serializedcredentials, "base64").toString(
        "utf8",
      ),
    )
    const client = createKmsClient({
      credentials: {
        client_email,
        private_key,
      },
    })
    const keyName = client.cryptoKeyPath(
      CLOUD_PROJECT_ID,
      "global",
      "main",
      "main",
    )

    const [encryptResponse] = await client.encrypt({
      name: keyName,
      plaintext: Buffer.from(value, "utf8"),
    })

    const encryptedSecret: DbDocumentInput<EncryptedSecret> = {
      value: Buffer.from(encryptResponse.ciphertext!).toString("base64"),
    }
    await setById("vault", key, encryptedSecret)
  }
}

export default construct(
  getConfigImpl,
  setByIdImpl,
  (options?: ClientOptions) => new v1.KeyManagementServiceClient(options),
)

export type SetSecret = ReturnType<typeof construct>
