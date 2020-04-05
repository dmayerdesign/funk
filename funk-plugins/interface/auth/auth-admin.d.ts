import { CustomClaims } from '@funk/model/auth/custom-claims'
import { DecodedIdToken } from '@funk/plugins/auth/decoded-id-token'
import { UserRecord } from '@funk/plugins/auth/user-record'

export declare function authAdmin(): {
  getUser(uid: string): Promise<UserRecord>
  getUserByEmail(email: string): Promise<UserRecord>
  setCustomUserClaims(uid: string, customUserClaims: CustomClaims): Promise<void>;
  verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
}
