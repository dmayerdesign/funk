import { UserConfig } from '@funk/model/user/user-config'
import { auth } from 'firebase'

export type UserHydrated = Partial<auth.IdTokenResult> & Partial<UserConfig>
