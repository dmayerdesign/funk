import { ContentPreview } from "@funk/content/model/content-preview"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserContent$ as UserContentChanges } from "@funk/identity/application/external/user-content"
import { Populate as PopulateUserContent } from "@funk/identity/user-content/application/external/behaviors/persistence/populate"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(
  populate: PopulateUserContent,
  userContentChanges: UserContentChanges,
) {
  const contentPreviewsChanges = userContentChanges.pipe(
    switchMap(populate),
    maybePluck("contentPreviews"),
    shareReplayOnce(),
  )
  contentPreviewsChanges.subscribe()

  return function (
    documentPath: string,
  ): Observable<ContentPreview | undefined> {
    const contentPreviewChanges = contentPreviewsChanges.pipe(
      maybePluck(documentPath),
      shareReplayOnce(),
    )
    contentPreviewChanges.subscribe()
    return contentPreviewChanges
  }
}

export type ListenById = ReturnType<typeof construct>
