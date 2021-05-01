import { ContentText, ContentType } from "@funk/admin/content/model/content"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export default function (
  id: PrimaryKey,
  contentData: Partial<Omit<ContentText, "id" | "type">> = {},
): ContentText {
  return {
    type: ContentType.TEXT,
    value: "",
    removedAt: null,
    ...contentData,
    id,
  }
}
