import {
  ignoreNullish,
  maybePluck,
  shareReplayOnce,
} from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/domain/user-state"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { from } from "rxjs"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(userSession: UserSession, listenById: ListenById) {
  const hasPreview = userSession.pipe(
    ignoreNullish(),
    pluck("person", "id"),
    switchMap((userId) =>
      from(listenById<UserState>(USER_STATES, userId)).pipe(
        maybePluck("contentPreviews"),
      ),
    ),
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
