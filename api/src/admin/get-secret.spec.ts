import { createGetConfigStub } from "@funk/functions/helpers/runtime/get-config"
import { construct } from "@funk/api/admin/get-secret"
import { EncryptedSecret } from "@funk/model/secret/encrypted-secret"

describe("getSecret", () =>
{
  it("should get a secret", async (done) =>
  {
    const { getConfig, createKmsClient, cryptoKeyPath, decrypt } = setUp()
    const getById = jasmine.createSpy().and.callFake(async () => ({
      value: Buffer.from("encrypted secret").toString("base64"),
    }) as EncryptedSecret)
    const getSecret = construct({ getConfig, createKmsClient, getById })
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

    done()
  })

  it("should get an undefined secret", async (done) =>
  {
    const { getConfig, createKmsClient, decrypt } = setUp()
    const getById = jasmine.createSpy().and.callFake(async () => undefined)
    const getSecret = construct({ getConfig, createKmsClient, getById })
    const SECRET_KEY = "secret key"

    const secret = await getSecret(SECRET_KEY)

    expect(secret).toBe(undefined)
    expect(decrypt).not.toHaveBeenCalled()

    done()
  })
})

function setUp() {
  const getConfig = createGetConfigStub()
  const cryptoKeyPath = jasmine.createSpy()
  const decrypt = jasmine.createSpy().and.returnValue(Promise.resolve([
    { plaintext: "decrypted secret" },
  ]))
  const createKmsClient = jasmine.createSpy().and.returnValue({
    cryptoKeyPath,
    decrypt,
  })
  return { getConfig, cryptoKeyPath, decrypt, createKmsClient }
}
