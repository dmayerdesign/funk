import getConfigImpl, {
  createGetConfigStub,
} from "@funk/http/plugins/internal/cloud-function/behaviors/runtime/get-config"
import { construct } from "@funk/secrets/plugins/internal/encrypted-storage/behaviors/set-secret"
import { EncryptedSecret } from "@funk/secrets/plugins/internal/encrypted-storage/encrypted-secret"

describe("setSecret", () => {
  let getConfig: typeof getConfigImpl
  let cryptoKeyPath: any
  let encrypt: any
  let createKmsClient: (options?: any) => any

  it("should set a secret", async () => {
    const setById = jest.fn().mockImplementation(
      async () =>
        ({
          value: Buffer.from("encrypted secret").toString("base64"),
        } as EncryptedSecret),
    )
    const setSecret = construct(getConfig, setById, createKmsClient)
    const SECRET_KEY = "secret key"

    await setSecret({ key: SECRET_KEY, value: "plaintext secret" })

    expect(createKmsClient).toHaveBeenCalledWith({
      credentials: JSON.parse(
        Buffer.from(getConfig().admin.serializedcredentials, "base64").toString(
          "utf8",
        ),
      ),
    })
    expect(cryptoKeyPath).toHaveBeenCalled()
    expect(encrypt).toHaveBeenCalledWith(expect.anything())
    expect(setById).toHaveBeenCalledWith("vault", SECRET_KEY, {
      value: Buffer.from("encrypted secret").toString("base64"),
    })
  })

  beforeEach(() => {
    getConfig = createGetConfigStub()
    cryptoKeyPath = jest.fn()
    encrypt = jest
      .fn()
      .mockReturnValue(Promise.resolve([{ ciphertext: "encrypted secret" }]))
    createKmsClient = jest.fn().mockReturnValue({
      cryptoKeyPath,
      encrypt,
    })
    return { getConfig, cryptoKeyPath, encrypt, createKmsClient }
  })
})
