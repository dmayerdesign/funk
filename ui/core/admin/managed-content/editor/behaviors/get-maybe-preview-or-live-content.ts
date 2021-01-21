import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import {
  CONTENTS,
  ManagedContent,
} from "@funk/model/managed-content/managed-content"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { combineLatest, from, Observable } from "rxjs"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(userSession: UserSession, listenById: ListenById) {
  return function (contentId: string): Observable<ManagedContent | undefined> {
    return userSession
      .pipe(ignoreNullish(), pluck("auth", "id"))
      .pipe(
        switchMap((userId) =>
          combineLatest([
            from(listenById<UserState>(USER_STATES, userId)).pipe(
              map((user) => user?.contentPreviews?.[contentId]?.content),
            ),
            from(listenById<ManagedContent>(CONTENTS, contentId)),
          ]).pipe(map(([preview, content]) => preview || content)),
        ),
      )
  }
}

export type GetMaybePreviewOrLiveContent = ReturnType<typeof construct>
