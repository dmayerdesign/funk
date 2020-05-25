export const USER_CONFIGS = "identity.user-configs"

export interface UserConfig
{
  id: string
  email?: string
  displayName?: string
  isAnonymous: boolean
}
