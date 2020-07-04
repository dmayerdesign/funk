import { UserRecord } from "@funk/plugins/auth/user-record"
import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

export function construct(setById?: SetById): typeof createPersonForNewUser

export default function createPersonForNewUser(user: UserRecord): Promise<any>

export type CreatePersonForNewUser = ReturnType<typeof construct>
