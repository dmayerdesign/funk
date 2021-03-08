import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
import { ListenById } from "@funk/identity/user-state/application/external/behaviors/persistence/listen-by-id"
import { from } from "rxjs"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(userSession: UserSession, listenById: ListenById) {
  const hasPreview = userSession.pipe(
    ignoreNullish(),
    pluck("person", "id"),
    switchMap((userId) => from(listenById(userId))),
    map(
      (maybeContentPreviews) =>
        !!Object.keys(maybeContentPreviews ?? {}).length,
    ),
    shareReplayOnce(),
  )
  hasPreview.subscribe()
  return () => hasPreview
}

export type GetHasPreview = ReturnType<typeof construct>
