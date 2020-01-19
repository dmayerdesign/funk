import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import createUid from '@funk/helpers/create-uid'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig } from '@funk/model/user/user-config'
import { IdentityApi } from '@funk/ui/web/app/identity/api'
import { User } from 'firebase'
import { of, BehaviorSubject } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

const USER_UID = createUid()

export const ID_TOKEN_STUB = 'test-token'

export const ID_TOKEN_RESULT_STUB = {
  claims: {},
}

export const createUserConfigStub = (email: string) => ({
  id: USER_UID,
  displayName: 'Test',
  email,
  role: UserRole.PUBLIC,
}) as UserConfig

export const createUserStub = (email = 'test@test.com') => ({
  ...createUserConfigStub(email),
  ...ID_TOKEN_RESULT_STUB,
})

export const createAuthUserStub = (email = 'test@test.com') => ({
  uid: USER_UID,
  getIdToken: (..._args: any[]) => Promise.resolve(ID_TOKEN_STUB),
  getIdTokenResult: (..._args: any[]) => Promise.resolve(createUserStub(email)),
}) as unknown as User

export const createUserCredentialStub = (
  email: string,
  authUserStub = createAuthUserStub(email)
) => ({
  credential: null,
  user: authUserStub,
})

export const createAuthStub = (authUserStub = createAuthUserStub()) => ({
  user: new BehaviorSubject(authUserStub),
  auth: {
    createUserWithEmailAndPassword: async (email: string) =>
      createUserCredentialStub(email, authUserStub),
    signInWithEmailAndPassword: async (email: string) =>
      createUserCredentialStub(email, authUserStub),
    signOut: async () => { },
    signInAnonymously: () => { },
    currentUser: authUserStub,
  },
  authState: new BehaviorSubject(authUserStub),
}) as unknown as AngularFireAuth

export const createStoreStub = (email = 'test@test.com') => ({
  collection: (..._collectionArgs: any[]) => ({
    doc: (..._docArgs: any[]) => ({
      valueChanges: (..._valueChangesArgs: any[]) => of(createUserConfigStub(email))
        .pipe(shareReplay(1)),
    }),
  }),
}) as AngularFirestore

export const createDefaultIdentityApiStub = () =>
  new IdentityApi(createAuthStub(), createStoreStub())
