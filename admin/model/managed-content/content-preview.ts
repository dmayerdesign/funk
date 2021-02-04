import { ManagedContent } from "@funk/admin/model/managed-content/managed-content"
import { Timestamp } from "@funk/persistence/model/timestamp"

export interface ContentPreview {
  createdAt: Timestamp
  content: ManagedContent
}
