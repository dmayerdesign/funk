import { ContentHtml, ContentType } from "@funk/content/model/content"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export default function (
  id: PrimaryKey,
  contentData: Partial<Omit<ContentHtml, "id" | "type">> = {},
): ContentHtml {
  return {
    type: ContentType.HTML,
    value: "",
    removedAt: null,
    ...contentData,
    id,
  }
}
