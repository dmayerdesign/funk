import { ManagedContent } from "@funk/admin/domain/managed-content/managed-content"
import { Timestamp } from "@funk/persistence/domain/timestamp"

export interface ContentPreview {
  createdAt: Timestamp
  content: ManagedContent
}
