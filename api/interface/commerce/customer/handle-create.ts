import { UserRecord } from "@funk/plugins/auth/user-record"
import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

export declare const construct: (setById: SetById) => typeof handleCreate

declare function handleCreate(user: UserRecord): Promise<any>
export default handleCreate

export type HandleCreate = typeof handleCreate
