import { ContentPreview } from "@funk/content/model/content-preview"
import { Marshall as MarshallContentPreview } from "@funk/content/preview/application/external/behaviors/persistence/marshall"
import { asPromise } from "@funk/helpers/as-promise"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Marshall as MarshallUserContent } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshallUserContent: MarshallUserContent,
  userContentChanges: UserContentChanges,
  marshallContentPreview: MarshallContentPreview,
) {
  return async function (
    documentPath: string,
    documentData: Partial<ContentPreview>,
  ): Promise<void> {
    const userContent = await asPromise(userContentChanges)
    const userContentId = userContent?.id
    const contentPreviews = userContent?.contentPreviews ?? {}

    contentPreviews[documentPath] = marshallContentPreview({
      ...contentPreviews[documentPath],
      ...documentData,
    }) as ContentPreview

    const newUserContent: UserContent = {
      ...userContent!,
      contentPreviews,
    }
    await updateById(
      USER_CONTENTS,
      userContentId!,
      marshallUserContent(newUserContent),
    )
  }
}

export type UpdateById = ReturnType<typeof construct>
