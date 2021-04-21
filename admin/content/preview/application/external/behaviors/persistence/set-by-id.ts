import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { asPromise } from "@funk/helpers/as-promise"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Marshall as MarshallUserContent } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshall: MarshallUserContent,
  userContentChanges: UserContentChanges,
) {
  return async function (
    documentPath: string,
    documentData: ContentPreview,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const userContent = await asPromise(userContentChanges)
    const userContentId = userContent?.id
    const contentPreviews = userContent?.contentPreviews

    if (contentPreviews) {
      if (options?.overwrite) {
        contentPreviews[documentPath] = documentData
      } else {
        contentPreviews[documentPath] = {
          ...contentPreviews[documentPath],
          ...documentData,
        }
      }

      const newUserContent: UserContent = {
        ...userContent!,
        contentPreviews,
      }
      await updateById(USER_CONTENTS, userContentId!, marshall(newUserContent))
    }
  }
}

export type SetById = ReturnType<typeof construct>
