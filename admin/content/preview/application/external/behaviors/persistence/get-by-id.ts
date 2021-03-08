import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Populate } from "@funk/admin/content/preview/application/external/behaviors/persistence/populate"
import { asPromise } from "@funk/helpers/as-promise"
import { UserState$ as UserStateChanges } from "@funk/identity/application/external/user-state"

export function construct(
  populate: Populate,
  userStateChanges: UserStateChanges,
) {
  return async function (
    documentPath: string,
  ): Promise<ContentPreview | undefined> {
    const userState = await asPromise(userStateChanges)
    return populate(userState?.contentPreviews?.[documentPath])
  }
}

export type GetById = ReturnType<typeof construct>
