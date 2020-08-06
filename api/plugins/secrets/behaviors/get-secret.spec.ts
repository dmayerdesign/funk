import getConfigImpl, { createGetConfigStub } from "@funk/functions/helpers/runtime/get-config"
import { construct } from "@funk/api/plugins/secrets/behaviors/get-secret"
import { EncryptedSecret } from "@funk/model/secret/encrypted-secret"

describe("getSecret", () =>
{
  let getConfig: typeof getConfigImpl
  let cryptoKeyPath: any
  let decrypt: any
  let createKmsClient: (options?: any) => any

  it("should get a secret", async () =>
  {
    const getById = jasmine.createSpy().and.callFake(async () => ({
      value: Buffer.from("encrypted secret").toString("base64"),
    }) as EncryptedSecret)
    const getSecret = construct(
      getConfig,
      getById,
      createKmsClient
    )
    const SECRET_KEY = "secret key"

    const secret = await getSecret(SECRET_KEY)

    expect(secret).toBe("decrypted secret")
    expect(createKmsClient).toHaveBeenCalledWith({
      credentials: JSON.parse(
        Buffer.from(getConfig().admin.serializedcredentials, "base64").toString("utf8")),
    })
    expect(cryptoKeyPath).toHaveBeenCalled()
    expect(getById).toHaveBeenCalledWith("vault", SECRET_KEY)
    expect(decrypt).toHaveBeenCalledWith(expect.anything())
  })

  it("should get an undefined secret", async () =>
  {
    const getById = jasmine.createSpy().and.callFake(async () => undefined)
    const getSecret = construct(getConfig, getById, createKmsClient)
    const SECRET_KEY = "secret key"

    const secret = await getSecret(SECRET_KEY)

    expect(secret).toBe(undefined)
    expect(decrypt).not.toHaveBeenCalled()
  })


  beforeEach(() =>
  {
    getConfig = createGetConfigStub()
    cryptoKeyPath = jasmine.createSpy()
    decrypt = jasmine.createSpy().and.returnValue(Promise.resolve([
      { plaintext: "decrypted secret" },
    ]))
    createKmsClient = jasmine.createSpy().and.returnValue({
      cryptoKeyPath,
      decrypt,
    })
    return { getConfig, cryptoKeyPath, decrypt, createKmsClient }
  })

})
