import { Marshall } from "@funk/admin/content/application/external/behaviors/persistence/marshall"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { asPromise } from "@funk/helpers/as-promise"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshall: Marshall,
  userContentChanges: UserContentChanges,
) {
  return async function (
    documentPath: string,
    documentData: Partial<ContentPreview>,
  ): Promise<void> {
    const userContent = await asPromise(userContentChanges)
    const userContentId = userContent?.id
    const contentPreviews = userContent?.contentPreviews

    if (contentPreviews) {
      contentPreviews[documentPath] = {
        ...contentPreviews[documentPath],
        ...documentData,
      }

      const newUserContent: UserContent = {
        ...userContent!,
        contentPreviews,
      }
      await updateById(USER_CONTENTS, userContentId!, marshall(newUserContent))
    }
  }
}

export type UpdateById = ReturnType<typeof construct>
