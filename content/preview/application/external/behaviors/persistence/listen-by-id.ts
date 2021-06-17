import { ContentPreview } from "@funk/content/model/content-preview"
import { Populate as PopulateContentPreview } from "@funk/content/preview/application/external/behaviors/persistence/populate"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(
  populate: PopulateContentPreview,
  userContentChanges: UserContentChanges,
) {
  const contentPreviewsChanges = userContentChanges.pipe(
    maybePluck("contentPreviews"),
    shareReplayOnce(),
  )
  contentPreviewsChanges.subscribe()

  return function (
    documentPath: string,
  ): Observable<ContentPreview | undefined> {
    const contentPreviewChanges = contentPreviewsChanges.pipe(
      maybePluck(documentPath),
      switchMap(populate),
      shareReplayOnce(),
    )
    return contentPreviewChanges
  }
}

export type ListenById = ReturnType<typeof construct>
