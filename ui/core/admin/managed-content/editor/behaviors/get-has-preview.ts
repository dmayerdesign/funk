import { ignoreNullish, maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { from } from "rxjs"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(
  userSession: UserSession,
  listenById: ListenById
)
{
  const hasPreview = userSession.pipe(
    ignoreNullish(),
    pluck("person", "id"),
    switchMap((userId) =>
      from(listenById<UserState>(
        USER_STATES,
        userId))
        .pipe(
          maybePluck("contentPreviews"))),
    map((maybeContentPreviews) => !!Object.keys(maybeContentPreviews ?? {}).length),
    shareReplayOnce())
  hasPreview.subscribe()
  return () => hasPreview
}

export type GetHasPreview = ReturnType<typeof construct>
