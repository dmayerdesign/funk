import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { asPromise } from "@funk/helpers/as-promise"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getIsAuthorized: GetIsAuthorized,
) {
  return async function (contentId: PrimaryKey): Promise<void> {
    const canActivate = await asPromise(getIsAuthorized())
    if (canActivate) {
      getMaybeActiveContentId().next(contentId)
    }
  }
}

export type OpenEditor = ReturnType<typeof construct>
