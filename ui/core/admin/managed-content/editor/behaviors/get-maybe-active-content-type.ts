import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { GetMaybeActiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content"

export function construct(getMaybeActiveContent: GetMaybeActiveContent) {
  const maybeActiveContentType = getMaybeActiveContent().pipe(
    maybePluck("type"),
    shareReplayOnce(),
  )
  maybeActiveContentType.subscribe()
  return () => maybeActiveContentType
}

export type GetMaybeActiveContentType = ReturnType<typeof construct>
