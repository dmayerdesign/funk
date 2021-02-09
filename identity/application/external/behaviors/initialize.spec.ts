import { UserRole } from "@funk/auth/model/user-role"
import { AuthClient } from "@funk/auth/plugins/external/auth-client"
import { construct } from "@funk/identity/application/external/behaviors/initialize"
import { UserIdToken } from "@funk/identity/application/external/user-id-token"
import { UserSession } from "@funk/identity/application/external/user-session"
import { of } from "rxjs"

describe("identityInitialize", () => {
  let auth: AuthClient
  let userSession: UserSession
  let userIdToken: UserIdToken

  it("should initialize for an anonymous user", async () => {
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

  it("should initialize for a logged-in user", async () => {
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
