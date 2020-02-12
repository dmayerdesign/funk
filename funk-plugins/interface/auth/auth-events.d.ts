import { CustomClaims } from '@funk/model/auth/custom-claims'
import { UserRecord } from '@funk/plugins/auth/user-record'
import { Context } from '@funk/plugins/db/event/context'
import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'

export declare function authEvents():
{
  user(): {
    onCreate(handler: (user: UserRecord, context: Context) => PromiseLike<any> | any): CloudFunction<UserRecord>;
    /** Respond to the deletion of a Firebase Auth user. */
    onDelete(handler: (user: UserRecord, context: Context) => PromiseLike<any> | any): CloudFunction<UserRecord>;
  }
}
