import {
    AuthClient,
    AuthProvider
} from "@funk/auth/plugins/external/auth-client"
import { SendEmailVerification } from "@funk/identity/application/external/behaviors/send-email-verification"
import { construct } from "@funk/identity/application/external/behaviors/sign-in-with-provider"
import { createAuthClientStub } from "@funk/identity/application/external/stubs"

describe("signInWithProvider", () => {
  let authClient: AuthClient
  let sendEmailVerification: SendEmailVerification

  it("should call through to AuthClient#signInWithPopup", async function () {
    const signInWithProvider = construct(authClient, sendEmailVerification)

    await signInWithProvider({} as AuthProvider)

    expect(authClient.signInWithPopup).toHaveBeenCalledTimes(1)
    expect(sendEmailVerification).toHaveBeenCalledTimes(1)
  })

  beforeEach(() => {
    authClient = createAuthClientStub()
    sendEmailVerification = jest.fn()
    spyOn(authClient, "signInWithPopup")
  })
})
