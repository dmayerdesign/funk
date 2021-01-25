import { GetMaybeActiveContent } from "@funk/admin/application/external/managed-content/editor/behaviors/get-maybe-active-content"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"

export function construct(getMaybeActiveContent: GetMaybeActiveContent) {
  const maybeActiveContentType = getMaybeActiveContent().pipe(
    maybePluck("type"),
    shareReplayOnce(),
  )
  maybeActiveContentType.subscribe()
  return () => maybeActiveContentType
}

export type GetMaybeActiveContentType = ReturnType<typeof construct>
