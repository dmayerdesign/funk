import {
  createAuthStub,
} from "@funk/ui/core/identity/stubs"
import { construct as constructSendEmailVerification } from
  "@funk/ui/core/identity/actions/send-email-verification"
import { construct } from "@funk/ui/core/identity/actions/create-user-with-email-and-password"

describe("createUserWithEmailAndPassword", () =>
{
  let sendEmailVerification: ReturnType<typeof constructSendEmailVerification>

  it("should create a user", async (done) =>
  {
    const TEST_EMAIL = "test-create-user@test.com"
    const createUserWithEmailAndPassword =
      construct(createAuthStub(), sendEmailVerification)

    await createUserWithEmailAndPassword(TEST_EMAIL, "test")

    expect(sendEmailVerification).toHaveBeenCalledTimes(1)
    done()
  })

  beforeEach(() =>
  {
    sendEmailVerification = jest.fn()
  })
})
