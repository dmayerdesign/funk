import { GetMaybeActiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content"
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
