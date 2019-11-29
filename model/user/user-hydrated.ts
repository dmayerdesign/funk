import { auth } from 'firebase'
import { UserConfig } from './user-config'

export type UserHydrated = Partial<auth.IdTokenResult> & Partial<UserConfig>
