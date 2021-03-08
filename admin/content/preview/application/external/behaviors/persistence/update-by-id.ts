import { Marshall } from "@funk/admin/content/application/external/behaviors/persistence/marshall"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { asPromise } from "@funk/helpers/as-promise"
import { UserState$ as UserStateChanges } from "@funk/identity/application/external/user-state"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshall: Marshall,
  userStateChanges: UserStateChanges,
) {
  return async function (
    documentPath: string,
    documentData: Partial<ContentPreview>,
  ): Promise<void> {
    const userState = await asPromise(userStateChanges)
    const userStateId = userState?.id
    const contentPreviews = userState?.contentPreviews

    if (contentPreviews) {
      contentPreviews[documentPath] = {
        ...contentPreviews[documentPath],
        ...documentData,
      }

      const newUserState: UserState = {
        ...userState!,
        contentPreviews,
      }
      await updateById(USER_STATES, userStateId!, marshall(newUserState))
    }
  }
}

export type UpdateById = ReturnType<typeof construct>
