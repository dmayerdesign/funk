import { Content } from "@funk/admin/content/model/content"
import { Timestamp } from "@funk/persistence/model/timestamp"

export interface ContentPreview {
  createdAt: Timestamp
  content: Content
}
