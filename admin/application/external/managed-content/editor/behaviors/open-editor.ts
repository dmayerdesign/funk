import { GetIsAuthorized } from "@funk/admin/application/external/managed-content/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentId } from "@funk/admin/application/external/managed-content/editor/behaviors/get-maybe-active-content-id"
import { asPromise } from "@funk/helpers/as-promise"

export function construct(
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getIsAuthorized: GetIsAuthorized,
) {
  return async function (contentId: string): Promise<void> {
    const canActivate = await asPromise(getIsAuthorized())
    if (canActivate) {
      getMaybeActiveContentId().next(contentId)
    }
  }
}

export type OpenEditor = ReturnType<typeof construct>
