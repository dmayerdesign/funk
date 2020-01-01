import { UserConfig } from '@funk/model/user/user-config'
import { IdTokenAndClaims } from '@funk/plugins/auth/id-token-and-claims'

export type UserHydrated = Partial<IdTokenAndClaims> & Partial<UserConfig>
