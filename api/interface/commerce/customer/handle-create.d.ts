import { UserRecord } from "@funk/plugins/auth/user-record"
import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

export const construct: (setById: SetById) => typeof handleCreate

export default function handleCreate(user: UserRecord): Promise<any>

export type HandleCreate = typeof handleCreate
