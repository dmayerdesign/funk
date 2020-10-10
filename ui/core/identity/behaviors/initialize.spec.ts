import { UserRole } from "@funk/model/auth/user-role"
import { construct } from "@funk/ui/core/identity/behaviors/initialize"
import { UserIdToken } from "@funk/ui/core/identity/user-id-token"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { AuthClient } from "@funk/ui/plugins/auth/auth-client"
import { of } from "rxjs"

describe("identityInitialize", () => {
  let auth: AuthClient
  let userSession: UserSession
  let userIdToken: UserIdToken

  it("should initialize for an anonymous user", async function () {
    auth = ({
      idTokenResult: of(null),
      signInAnonymously: jest.fn().mockImplementation(() => Promise.resolve()),
    } as unknown) as AuthClient
    const initialize = construct(auth, userSession, userIdToken)
    initialize()

    Promise.resolve().then(() => {
      expect(userSession.subscribe).toHaveBeenCalled()
      expect(userIdToken.subscribe).toHaveBeenCalled()
      expect(auth.signInAnonymously).toHaveBeenCalledTimes(1)
    })
  })

  it("should initialize for a logged-in user", async function () {
    auth = ({
      idTokenResult: of({
        claims: {
          role: UserRole.PUBLIC,
        },
      }),
      signInAnonymously: jest.fn(),
    } as unknown) as AuthClient
    const initialize = construct(auth, userSession, userIdToken)
    initialize()

    Promise.resolve().then(() => {
      expect(auth.signInAnonymously).not.toHaveBeenCalled()
    })
  })

  beforeEach(() => {
    userSession = ({ subscribe: jest.fn() } as unknown) as UserSession
    userIdToken = ({ subscribe: jest.fn() } as unknown) as UserIdToken
  })
})
