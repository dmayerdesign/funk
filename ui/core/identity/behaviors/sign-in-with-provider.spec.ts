import { SendEmailVerification } from "@funk/ui/core/identity/behaviors/send-email-verification"
import { construct } from "@funk/ui/core/identity/behaviors/sign-in-with-provider"
import {
    createAuthClientStub
} from "@funk/ui/core/identity/stubs"
import { AuthClient, AuthProvider } from "@funk/ui/plugins/auth/auth-client"

describe("signInWithProvider", () =>
{
  let authClient: AuthClient
  let sendEmailVerification: SendEmailVerification

  it("should call through to AuthClient#signInWithPopup", async function ()
  {
    const signInWithProvider = construct(authClient, sendEmailVerification)

    await signInWithProvider({} as AuthProvider)

    expect(authClient.signInWithPopup).toHaveBeenCalledTimes(1)
    expect(sendEmailVerification).toHaveBeenCalledTimes(1)
  })

  beforeEach(() =>
  {
    authClient = createAuthClientStub()
    sendEmailVerification = jest.fn()
    spyOn(authClient, "signInWithPopup")
  })
})
