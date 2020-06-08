import { Timestamp } from "@funk/model/data-access/timestamp"
import { ManagedContent } from "@funk/model/managed-content/managed-content"

export interface ContentPreview {
  createdAt: Timestamp
  content: ManagedContent
}
