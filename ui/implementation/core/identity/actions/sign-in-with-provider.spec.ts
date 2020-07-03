import { AuthClient, AuthProvider } from "@funk/plugins/auth/auth-client"
import {
  createAuthClientStub,
} from "@funk/ui/core/identity/stubs"
import { construct } from "@funk/ui/core/identity/actions/sign-in-with-provider"

describe("signInWithProvider", () =>
{
  let authClient: AuthClient

  it("should call through to AuthClient#signInWithPopup", async () =>
  {
    const signInWithProvider = construct(authClient)

    await signInWithProvider({} as AuthProvider)

    expect(authClient.signInWithPopup).toHaveBeenCalledTimes(1)
  })

  beforeEach(() =>
  {
    authClient = createAuthClientStub()
    spyOn(authClient, "signInWithPopup")
  })
})
