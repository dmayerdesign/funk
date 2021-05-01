import getMaybeActiveContentIdImpl from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"

export function construct(
  getMaybeActiveContentId = getMaybeActiveContentIdImpl,
) {
  return function (): void {
    getMaybeActiveContentId().next(undefined)
  }
}

export type CancelEdit = ReturnType<typeof construct>
