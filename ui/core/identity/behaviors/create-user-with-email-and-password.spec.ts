import { construct } from "@funk/ui/core/identity/behaviors/create-user-with-email-and-password"
import { construct as constructSendEmailVerification } from "@funk/ui/core/identity/behaviors/send-email-verification"
import { createAuthClientStub } from "@funk/ui/core/identity/stubs"

describe("createUserWithEmailAndPassword", () => {
  let sendEmailVerification: ReturnType<typeof constructSendEmailVerification>

  it("should create a user", async function () {
    const TEST_EMAIL = "test-create-user@test.com"
    const createUserWithEmailAndPassword = construct(
      createAuthClientStub(),
      sendEmailVerification
    )

    await createUserWithEmailAndPassword(TEST_EMAIL, "test")

    expect(sendEmailVerification).toHaveBeenCalledTimes(1)
  })

  beforeEach(() => {
    sendEmailVerification = jest.fn()
  })
})
