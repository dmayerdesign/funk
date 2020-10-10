import getMaybeActiveContentIdImpl from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-id"

export function construct(
  getMaybeActiveContentId = getMaybeActiveContentIdImpl
) {
  return () => getMaybeActiveContentId().next(undefined)
}

export type CancelEdit = ReturnType<typeof construct>
