import { ContentPreview } from "@funk/admin/content/model/content-preview"

export const USER_CONTENTS = "identity.user-contents"

export interface UserContent {
  id: string
  contentPreviews?: ContentPreviews
}

export interface ContentPreviews {
  [contentId: string]: ContentPreview
}
