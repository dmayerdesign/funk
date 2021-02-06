import {
  CONTENTS,
  ManagedContent,
} from "@funk/admin/model/managed-content/managed-content"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
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
