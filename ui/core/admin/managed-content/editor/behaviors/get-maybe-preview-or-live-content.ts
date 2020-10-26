import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import {
  CONTENTS,
  ManagedContent
} from "@funk/model/managed-content/managed-content"
import { GetIsAuthorized } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-is-authorized"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { combineLatest, from, Observable } from "rxjs"
import { map, pluck, switchMap } from "rxjs/operators"

export function construct(
  userSession: UserSession,
  getIsAuthorized: GetIsAuthorized,
  listenById: ListenById
) {
  return function (contentId: string): Observable<ManagedContent | undefined> {
    return combineLatest([
      userSession.pipe(ignoreNullish(), pluck("auth", "id")),
      getIsAuthorized(),
    ]).pipe(
      switchMap(([userId, isActivated]) =>
        isActivated
          ? combineLatest([
              from(listenById<UserState>(USER_STATES, userId)).pipe(
                map((user) => user?.contentPreviews?.[contentId]?.content)
              ),
              from(listenById<ManagedContent>(CONTENTS, contentId)),
            ]).pipe(map(([preview, content]) => preview || content))
          : from(listenById<ManagedContent>(CONTENTS, contentId))
      )
    )
  }
}

export type GetMaybePreviewOrLiveContent = ReturnType<typeof construct>
