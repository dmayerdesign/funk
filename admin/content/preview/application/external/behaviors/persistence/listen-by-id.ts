import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserState$ as UserStateChanges } from "@funk/identity/application/external/user-state"
import { Populate as PopulateUserState } from "@funk/identity/user-state/application/external/behaviors/persistence/populate"
import { Observable } from "rxjs"
import { map, switchMap } from "rxjs/operators"

export function construct(
  populate: PopulateUserState,
  userStateChanges: UserStateChanges,
) {
  const contentPreviewsChanges = userStateChanges.pipe(
    switchMap(populate),
    maybePluck("contentPreviews"),
    shareReplayOnce(),
  )
  contentPreviewsChanges.subscribe()
  return function (
    documentPath: string,
  ): Observable<ContentPreview | undefined> {
    const contentPreviewChanges = contentPreviewsChanges.pipe(
      map((contentPreviews) => contentPreviews?.[documentPath]),
      shareReplayOnce(),
    )
    contentPreviewChanges.subscribe()
    return contentPreviewChanges
  }
}

export type ListenById = ReturnType<typeof construct>
