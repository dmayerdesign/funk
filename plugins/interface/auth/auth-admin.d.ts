import { CustomClaims } from '@funk/model/auth/custom-claims'
import { UserRecord } from '@funk/plugins/auth/user-record'
import { DecodedIdToken } from '@funk/plugins/auth/decoded-id-token'

export declare function authAdmin():
{
  getUser(uid: string): Promise<UserRecord>
  getUserByEmail(email: string): Promise<UserRecord>
  setCustomUserClaims(uid: string, customUserClaims: CustomClaims): Promise<void>;
  verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
}
