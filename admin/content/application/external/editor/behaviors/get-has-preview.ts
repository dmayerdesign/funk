import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
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
    map(
      (maybeUserContent) =>
        !!Object.keys(maybeUserContent?.contentPreviews ?? {}).length,
    ),
    shareReplayOnce(),
  )
  hasPreview.subscribe()
  return () => hasPreview
}

export type GetHasPreview = ReturnType<typeof construct>
