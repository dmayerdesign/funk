import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Populate } from "@funk/admin/content/preview/application/external/behaviors/persistence/populate"
import { asPromise } from "@funk/helpers/as-promise"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"

export function construct(
  populate: Populate,
  userContentChanges: UserContentChanges,
) {
  return async function (
    documentPath: string,
  ): Promise<ContentPreview | undefined> {
    const userContent = await asPromise(userContentChanges)
    return populate(userContent?.contentPreviews?.[documentPath])
  }
}

export type GetById = ReturnType<typeof construct>
