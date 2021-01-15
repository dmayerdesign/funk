import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import getMaybeActiveContentIdImpl from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-id"
import { GetMaybePreviewOrLiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-preview-or-live-content"
import { of } from "rxjs"
import { first, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentId = getMaybeActiveContentIdImpl,
  getMaybePreviewOrLiveContent: GetMaybePreviewOrLiveContent,
) {
  const activeContent = getMaybeActiveContentId().pipe(
    switchMap((contentId) =>
      !!contentId
        ? getMaybePreviewOrLiveContent(contentId).pipe(first())
        : of(undefined),
    ),
    shareReplayOnce(),
  )
  activeContent.subscribe()
  return () => activeContent
}

export type GetMaybeActiveContent = ReturnType<typeof construct>
