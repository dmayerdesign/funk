import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserContent } from "@funk/identity/model/user-content"
import { ListenById } from "@funk/identity/user-content/application/external/behaviors/persistence/listen-by-id"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(
  userSession: UserSession,
  listenForUserContentById: ListenById,
) {
  const hasPreview = userSession.pipe(
    ignoreNullish(),
    pluck("person", "id"),
    switchMap((userId) => listenForUserContentById(userId)),
    map(isInPreviewMode),
    shareReplayOnce(),
  )
  hasPreview.subscribe()
  return () => hasPreview
}

function isInPreviewMode(maybeUserContent: UserContent | undefined): boolean {
  return (
    !!maybeUserContent?.contentPreviews &&
    !!Object.keys(maybeUserContent.contentPreviews).length &&
    !Object.keys(maybeUserContent.contentPreviews).every(
      (contentId) =>
        maybeUserContent.contentPreviews?.[contentId]?.isUnpublished,
    )
  )
}

export type GetHasPreview = ReturnType<typeof construct>
