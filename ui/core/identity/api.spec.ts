import { IdentityApi } from "@funk/ui/core/identity/api"
import {
  ID_TOKEN_STUB,
  createAnonymousUserStub,
  createAuthStub,
  createAuthUserStub,
  createUserCredentialStub,
  createUserConfigStub,
} from "@funk/ui/core/identity/stubs"
import { construct as constructListenById } from
  "@funk/plugins/persistence/actions/listen-by-id"
import { first } from "rxjs/operators"
import { UserRole } from "@funk/model/auth/user-role"

describe("IdentityApi", () =>
{
  let listenById: ReturnType<typeof constructListenById>

  it("should instantiate successfully", () =>
  {
    expect(new IdentityApi(createAuthStub(), listenById)).toBeTruthy()
  })

  it("should initialize fpr an anonymous user", async (done) =>
  {
    const authUserStub = createAuthUserStub()
    spyOn(authUserStub, "getIdToken")

    new IdentityApi(createAuthStub(authUserStub), listenById).init()

    // expect(authUserStub.getIdToken).toHaveBeenCalledTimes(1)
    expect(authUserStub.getIdToken).toHaveBeenCalled()
    expect(listenById).not.toHaveBeenCalled()
    done()
  })

  it("should initialize fpr a logged-in user", async (done) =>
  {
    const authUserStub = createAuthUserStub(UserRole.PUBLIC)
    spyOn(authUserStub, "getIdToken")

    new IdentityApi(createAuthStub(authUserStub), listenById).init()

    expect(authUserStub.getIdToken).toHaveBeenCalled()
    expect(listenById).toHaveBeenCalled()
    done()
  })

  it("should emit a user", async (done) =>
  {
    const api = new IdentityApi(createAuthStub(), listenById)
    expect(await api.user$.pipe(first()).toPromise()).toEqual(
      createAnonymousUserStub())
    done()
  })

  it("should emit an id token", async (done) =>
  {
    const api = new IdentityApi(createAuthStub(), listenById)
    expect(await api.userIdToken$.pipe(first()).toPromise()).toEqual(ID_TOKEN_STUB)
    done()
  })

  it("should create a user", async (done) =>
  {
    const TEST_EMAIL = "test-create-user@test.com"
    const authUserStub = createAuthUserStub()
    const api = new IdentityApi(createAuthStub(authUserStub), listenById)
    const userCredentialStubSerialized = JSON.stringify(
      createUserCredentialStub(authUserStub)
    )
    spyOn(authUserStub, "sendEmailVerification")

    const createUserResultSerialized = JSON.stringify(
      await api.createUserWithEmailAndPassword(TEST_EMAIL, "test")
    )
    expect(createUserResultSerialized).toEqual(userCredentialStubSerialized)
    expect(authUserStub.sendEmailVerification).toHaveBeenCalledTimes(1)
    done()
  })

  it("should sign in a user", async (done) =>
  {
    const TEST_EMAIL = "test-create-user@test.com"
    const authUserStub = createAuthUserStub()
    const api = new IdentityApi(createAuthStub(authUserStub), listenById)
    const userCredentialStubSerialized = JSON.stringify(
      createUserCredentialStub(authUserStub)
    )
    const signInResultSerialized = JSON.stringify(
      await api.signInWithEmailAndPassword(TEST_EMAIL, "test")
    )
    expect(signInResultSerialized).toEqual(userCredentialStubSerialized)
    done()
  })

  it("should sign a user out", async (done) =>
  {
    const authStub = createAuthStub()
    spyOn(authStub, "signOut")
    await new IdentityApi(authStub, listenById).signOut()
    expect(authStub.signOut).toHaveBeenCalledTimes(1)
    done()
  })

  beforeEach(() =>
  {
    listenById = jest.fn().mockResolvedValue(createUserConfigStub({}))
  })
})
