import { ContentPreview } from "@funk/admin/content/model/content-preview"

export const USER_STATES = "identity.user-states"

export interface UserState {
  id: string
  contentPreviews?: {
    [contentId: string]: ContentPreview
  }
}
