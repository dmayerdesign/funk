import { ManagedContent } from '@funk/model/managed-content/managed-content'

export const USER_STATES = 'identity.user-states'

export interface UserState
{
  id: string
  contentPreviews?: {
    [contentId: string]: ManagedContent
  }
}
