import { construct } from "@funk/ui/core/identity/actions/initialize"
import UserIdToken from "@funk/ui/core/identity/user-id-token"
import UserSession from "@funk/ui/core/identity/user-session"
import { AngularFireAuth } from "@angular/fire/auth"
import { UserRole } from "@funk/model/auth/user-role"
import { of } from "rxjs"

describe("identityInitialize", () =>
{
  let auth: AngularFireAuth
  let userSession: UserSession
  let userIdToken: UserIdToken

  it("should initialize for an anonymous user", async (done) =>
  {
    auth = {
      idTokenResult: of(null),
      signInAnonymously: jest.fn().mockImplementation(() => Promise.resolve()),
    } as unknown as AngularFireAuth
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
    } as unknown as AngularFireAuth
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
