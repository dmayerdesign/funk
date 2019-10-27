import { UserRole } from '@funk/model/auth/user-role'

export const USER_CONFIGS = 'user-configs'

export interface UserConfig {
  id: string
  email?: string
  displayName?: string
  role?: UserRole
}
