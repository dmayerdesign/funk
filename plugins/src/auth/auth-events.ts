import { CloudFunction } from '../cloud-function/cloud-function'
import { Context } from '../db/event/context'
import { UserRecord } from './user-record'

export declare function authEvents():
{
  user(): {
    onCreate(handler: (user: UserRecord, context: Context) =>
      PromiseLike<any> | any): CloudFunction<UserRecord>;
    /** Respond to the deletion of a Firebase Auth user. */
    onDelete(handler: (user: UserRecord, context: Context) =>
      PromiseLike<any> | any): CloudFunction<UserRecord>;
  }
}
