import { UserRecord } from "@funk/plugins/auth/user-record"
import setById from "@funk/plugins/persistence/actions/set-by-id"

export const construct: (deps?: { setById: typeof setById }) => typeof handleCreate

export default function handleCreate(user: UserRecord): Promise<any>

export type HandleCreate = typeof handleCreate
