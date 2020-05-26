import { createGetConfigStub } from "@funk/functions/helpers/runtime/get-config"
import { construct } from "@funk/api/admin/set-secret"
import { EncryptedSecret } from "@funk/model/secret/encrypted-secret"

describe("setSecret", () =>
{
  it("should set a secret", async (done) =>
  {
    const { getConfig, createKmsClient, cryptoKeyPath, encrypt } = setUp()
    const setById = jasmine.createSpy().and.callFake(async () => ({
      value: Buffer.from("encrypted secret").toString("base64"),
    }) as EncryptedSecret)
    const setSecret = construct({ getConfig, createKmsClient, setById })
    const SECRET_KEY = "secret key"

    await setSecret({ key: SECRET_KEY, value: "plaintext secret" })

    expect(createKmsClient).toHaveBeenCalledWith({
      credentials: JSON.parse(
        Buffer.from(getConfig().admin.serializedcredentials, "base64").toString("utf8")),
    })
    expect(cryptoKeyPath).toHaveBeenCalled()
    expect(encrypt).toHaveBeenCalledWith(expect.anything())
    expect(setById).toHaveBeenCalledWith("vault", SECRET_KEY,
      { value: Buffer.from("encrypted secret").toString("base64") })

    done()
  })
})

function setUp() {
  const getConfig = createGetConfigStub()
  const cryptoKeyPath = jasmine.createSpy()
  const encrypt = jasmine.createSpy().and.returnValue(Promise.resolve([
    { ciphertext: "encrypted secret" },
  ]))
  const createKmsClient = jasmine.createSpy().and.returnValue({
    cryptoKeyPath,
    encrypt,
  })
  return { getConfig, cryptoKeyPath, encrypt, createKmsClient }
}
