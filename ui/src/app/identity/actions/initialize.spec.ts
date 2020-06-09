import { construct } from "@funk/ui/app/identity/actions/initialize"
import { UserIdToken } from "@funk/ui/app/identity/user-id-token"
import { UserSession } from "@funk/ui/app/identity/user-session"
import { UserRole } from "@funk/model/auth/user-role"
import { AuthClient } from "@funk/plugins/auth/auth-client"
import { of } from "rxjs"

describe("identityInitialize", () =>
{
  let auth: AuthClient
  let userSession: UserSession
  let userIdToken: UserIdToken

  it("should initialize for an anonymous user", async (done) =>
  {
    auth = {
      idTokenResult: of(null),
      signInAnonymously: jest.fn().mockImplementation(() => Promise.resolve()),
    } as unknown as AuthClient
    const initialize = construct(
      auth,
      userSession,
      userIdToken
    )
    initialize()

    Promise.resolve().then(() =>
    {
      expect(userSession.subscribe).toHaveBeenCalled()
      expect(userIdToken.subscribe).toHaveBeenCalled()
      expect(auth.signInAnonymously).toHaveBeenCalledTimes(1)
      done()
    })
  })

  it("should initialize for a logged-in user", async (done) =>
  {
    auth = {
      idTokenResult: of({
        claims: {
          role: UserRole.PUBLIC,
        },
      }),
      signInAnonymously: jest.fn(),
    } as unknown as AuthClient
    const initialize = construct(
      auth,
      userSession,
      userIdToken
    )
    initialize()

    Promise.resolve().then(() =>
    {
      expect(auth.signInAnonymously).not.toHaveBeenCalled()
      done()
    })
  })

  beforeEach(() =>
  {
    userSession = { subscribe: jest.fn() } as unknown as UserSession
    userIdToken = { subscribe: jest.fn() } as unknown as UserIdToken
  })
})
