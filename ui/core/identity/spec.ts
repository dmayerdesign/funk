import { IdentityApi } from '@funk/ui/core/identity/api'
import { createAuthStub, createAuthUserStub, createStoreStub, createUserCredentialStub,
  createUserStub, ID_TOKEN_STUB } from '@funk/ui/core/identity/stubs'
import { first } from 'rxjs/operators'

describe('IdentityApi', () =>
{
  it('should instantiate successfully', () =>
  {
    expect(new IdentityApi(createAuthStub(), createStoreStub())).toBeTruthy()
  })

  it('should initialize', async (done) =>
  {
    const authUserStub = createAuthUserStub()
    spyOn(authUserStub, 'getIdToken')
    await new IdentityApi(createAuthStub(authUserStub), createStoreStub()).init()
    expect(authUserStub.getIdToken).toHaveBeenCalledTimes(1)
    done()
  })

  it('should emit a user', async (done) =>
  {
    const api = new IdentityApi(createAuthStub(), createStoreStub())
    expect(await api.user$.pipe(first()).toPromise()).toEqual(createUserStub())
    done()
  })

  it('should emit an id token', async (done) =>
  {
    const api = new IdentityApi(createAuthStub(), createStoreStub())
    expect(await api.userIdToken$.pipe(first()).toPromise()).toEqual(ID_TOKEN_STUB)
    done()
  })

  it('should create a user', async (done) =>
  {
    const TEST_EMAIL = 'test-create-user@test.com'
    const authUserStub = createAuthUserStub()
    const api = new IdentityApi(createAuthStub(authUserStub), createStoreStub())
    const userCredentialStubSerialized = JSON.stringify(
      createUserCredentialStub(authUserStub)
    )
    spyOn(authUserStub, 'sendEmailVerification')

    const createUserResultSerialized = JSON.stringify(
      await api.createUserWithEmailAndPassword(TEST_EMAIL, 'test')
    )
    expect(createUserResultSerialized).toEqual(userCredentialStubSerialized)
    expect(authUserStub.sendEmailVerification).toHaveBeenCalledTimes(1)
    done()
  })

  it('should sign in a user', async (done) =>
  {
    const TEST_EMAIL = 'test-create-user@test.com'
    const authUserStub = createAuthUserStub()
    const api = new IdentityApi(createAuthStub(authUserStub), createStoreStub())
    const userCredentialStubSerialized = JSON.stringify(
      createUserCredentialStub(authUserStub)
    )
    const signInResultSerialized = JSON.stringify(
      await api.signInWithEmailAndPassword(TEST_EMAIL, 'test')
    )
    expect(signInResultSerialized).toEqual(userCredentialStubSerialized)
    done()
  })

  it('should sign a user out', async (done) =>
  {
    const authStub = createAuthStub()
    spyOn(authStub, 'signOut')
    await new IdentityApi(authStub, createStoreStub()).signOut()
    expect(authStub.signOut).toHaveBeenCalledTimes(1)
    done()
  })
})
