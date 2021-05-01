import { Content } from "@funk/admin/content/model/content"
import { UpdatedAt } from "@funk/persistence/model/database-document"

export interface ContentPreview extends UpdatedAt {
  content: Content
  isUnpublished?: boolean
}
