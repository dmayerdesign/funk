import { ContentPreview } from "@funk/model/managed-content/content-preview"

export const USER_STATES = "identity.user-states"

export interface UserState {
  id: string
  contentPreviews?: {
    [contentId: string]: ContentPreview
  }
}
