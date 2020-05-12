import { IdTokenAndClaims } from '@funk/model/identity/id-token-and-claims'
import { UserConfig } from '@funk/model/identity/user-config'

export type UserHydrated = Partial<IdTokenAndClaims & UserConfig>
