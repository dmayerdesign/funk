import { UserConfig } from '@funk/model/identity/user-config'
import { IdTokenAndClaims } from '@funk/plugins/auth/id-token-and-claims'

export type UserHydrated = Partial<IdTokenAndClaims> & Partial<UserConfig>
