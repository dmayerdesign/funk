import getMaybeActiveContentIdImpl from "@funk/admin/application/external/managed-content/editor/behaviors/get-maybe-active-content-id"

export function construct(
  getMaybeActiveContentId = getMaybeActiveContentIdImpl,
) {
  return () => getMaybeActiveContentId().next(undefined)
}

export type CancelEdit = ReturnType<typeof construct>
