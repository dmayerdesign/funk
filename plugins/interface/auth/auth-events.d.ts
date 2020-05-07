import { UserRecord } from '@funk/plugins/auth/user-record'
import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'
import { Context } from '@funk/plugins/persistence/event/context'

export declare function authEvents(): {
  user(): {
    onCreate(handler: (user: UserRecord, context: Context) =>
      PromiseLike<any> | any): CloudFunction<UserRecord>;
    /** Respond to the deletion of a Firebase Auth user. */
    onDelete(handler: (user: UserRecord, context: Context) =>
      PromiseLike<any> | any): CloudFunction<UserRecord>;
  }
}
