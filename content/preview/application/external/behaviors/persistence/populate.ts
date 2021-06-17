import { Populate as PopulateContent } from "@funk/content/application/external/behaviors/persistence/populate"
import { Content } from "@funk/content/model/content"
import { ContentPreview } from "@funk/content/model/content-preview"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"

export function construct(populate: PopulateContent) {
  return async function (
    contentPreview: Marshalled<ContentPreview> | undefined,
  ): Promise<ContentPreview> {
    const marshalledContent = contentPreview?.content as Content
    const populatedContent = await populate(marshalledContent)
    return {
      ...contentPreview,
      content: populatedContent ?? marshalledContent,
    } as ContentPreview
  }
}

export type Populate = ReturnType<typeof construct>
