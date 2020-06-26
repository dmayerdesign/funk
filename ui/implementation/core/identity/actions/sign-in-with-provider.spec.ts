import { AuthClient, AuthProvider } from "@funk/plugins/auth/auth-client"
import {
  createAuthStub,
} from "@funk/ui/core/identity/stubs"
import { construct } from "@funk/ui/core/identity/actions/sign-in-with-provider"

describe("signInWithProvider", () =>
{
  let authClient: AuthClient

  it("should call through to AuthClient#signInWithPopup", async (done) =>
  {
    const signInWithProvider =
      construct(createAuthStub())

    await signInWithProvider({} as AuthProvider)

    expect(authClient.signInWithPopup).toHaveBeenCalledTimes(1)
    done()
  })

  beforeEach(() =>
  {
    authClient = createAuthStub()
    spyOn(authClient, "signInWithPopup")
  })
})
