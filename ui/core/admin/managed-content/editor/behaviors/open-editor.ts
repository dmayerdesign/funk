import { asPromise } from "@funk/helpers/as-promise"
import { GetIsAuthorized } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentId } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-id"

export function construct(
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getIsAuthorized: GetIsAuthorized
)
{
  return async function (contentId: string): Promise<void>
  {
    const canActivate = await asPromise(getIsAuthorized())
    if (canActivate)
    {
      getMaybeActiveContentId().next(contentId)
    }
  }
}

export type OpenEditor = ReturnType<typeof construct>
