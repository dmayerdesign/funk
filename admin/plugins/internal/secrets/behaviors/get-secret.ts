import { EncryptedSecret } from "@funk/admin/plugins/internal/secrets/encrypted-secret"
import { CLOUD_PROJECT_ID } from "@funk/configuration"
import getConfigImpl from "@funk/http/plugins/internal/cloud-function/behaviors/runtime/get-config"
import getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import { v1 } from "@google-cloud/kms"
import { ClientOptions } from "google-gax"

export function construct(
  getConfig: typeof getConfigImpl,
  getById: typeof getByIdImpl,
  createKmsClient: (options?: ClientOptions) => v1.KeyManagementServiceClient,
) {
  return async function (secretKey: string): Promise<string | undefined> {
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
    const encryptedSecret = await getById<EncryptedSecret>("vault", secretKey)

    if (encryptedSecret) {
      const encryptedSecretBuffer = Buffer.from(encryptedSecret.value, "base64")
      const [result] = await client.decrypt({
        name: keyName,
        ciphertext: encryptedSecretBuffer,
      })
      return result.plaintext?.toString()
    }

    return undefined
  }
}

export default construct(
  getConfigImpl,
  getByIdImpl,
  (options?: ClientOptions) => new v1.KeyManagementServiceClient(options),
)

export type GetSecret = ReturnType<typeof construct>
