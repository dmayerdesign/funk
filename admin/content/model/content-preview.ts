import { Content } from "@funk/admin/content/model/content"
import { Timestamp } from "@funk/persistence/model/timestamp"

export const enum ChangeType {
  ROLLBACK = "ROLLBACK",
  ROLLFORWARD = "ROLLFORWARD",
  NEW = "NEW"
}

export interface ContentPreview {
  createdAt: Timestamp
  changeType: ChangeType
  content: Content
}
