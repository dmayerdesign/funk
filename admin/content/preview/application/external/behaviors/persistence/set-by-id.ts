import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { asPromise } from "@funk/helpers/as-promise"
import { UserState$ as UserStateChanges } from "@funk/identity/application/external/user-state"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Marshall as MarshallUserState } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshall: MarshallUserState,
  userStateChanges: UserStateChanges,
) {
  return async function (
    documentPath: string,
    documentData: ContentPreview,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const userState = await asPromise(userStateChanges)
    const userStateId = userState?.id
    const contentPreviews = userState?.contentPreviews

    if (contentPreviews) {
      if (options?.overwrite) {
        contentPreviews[documentPath] = documentData
      } else {
        contentPreviews[documentPath] = {
          ...contentPreviews[documentPath],
          ...documentData,
        }
      }

      const newUserState: UserState = {
        ...userState!,
        contentPreviews,
      }
      await updateById(USER_STATES, userStateId!, marshall(newUserState))
    }
  }
}

export type SetById = ReturnType<typeof construct>
