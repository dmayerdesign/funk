import { asPromise } from "@funk/helpers/as-promise"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Marshall } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshallUserContent: Marshall,
  userContentChanges: UserContentChanges,
) {
  return async function (documentPath: string): Promise<void> {
    const userContent = await asPromise(userContentChanges)
    const userContentId = userContent?.id
    const contentPreviews = userContent?.contentPreviews

    if (contentPreviews) {
      delete contentPreviews[documentPath]

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
}

export type DeleteById = ReturnType<typeof construct>
