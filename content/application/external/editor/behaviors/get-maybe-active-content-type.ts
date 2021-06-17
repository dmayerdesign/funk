import { GetMaybeActiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { tapAndLog } from "@funk/helpers/tap-and-log"

export function construct(getMaybeActiveContent: GetMaybeActiveContent) {
  const maybeActiveContentType = getMaybeActiveContent().pipe(
    maybePluck("type"),
    tapAndLog("got here in GetMaybeActiveContentType"),
    shareReplayOnce(),
  )
  maybeActiveContentType.subscribe()
  return () => maybeActiveContentType
}

export type GetMaybeActiveContentType = ReturnType<typeof construct>
