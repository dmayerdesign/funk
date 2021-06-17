import { Content } from "@funk/content/model/content"
import { UpdatedAt } from "@funk/persistence/model/database-document"

export interface ContentPreview extends UpdatedAt {
  content: Content
  isUnpublished: boolean
}
