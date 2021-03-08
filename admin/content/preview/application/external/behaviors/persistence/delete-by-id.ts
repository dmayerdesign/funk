import { asPromise } from "@funk/helpers/as-promise"
import { UserState$ as UserStateChanges } from "@funk/identity/application/external/user-state"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Marshall } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import { UpdateById as GenericUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: GenericUpdateById,
  marshallUserState: Marshall,
  userStateChanges: UserStateChanges,
) {
  return async function (documentPath: string): Promise<void> {
    const userState = await asPromise(userStateChanges)
    const userStateId = userState?.id
    const contentPreviews = userState?.contentPreviews

    if (contentPreviews) {
      delete contentPreviews[documentPath]

      const newUserState: UserState = {
        ...userState!,
        contentPreviews,
      }
      await updateById(
        USER_STATES,
        userStateId!,
        marshallUserState(newUserState),
      )
    }
  }
}

export type DeleteById = ReturnType<typeof construct>
