import { GetMaybeActiveContentCoverImageGroupControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-url-control"
import { ImageGroup } from "@funk/admin/image-group/model/image-group"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentCoverImageGroupControl: GetMaybeActiveContentCoverImageGroupControl,
) {
  const controlValueChanges = getMaybeActiveContentCoverImageGroupControl().pipe(
    ignoreNullish(),
    switchMap((content) => content.valueChanges.pipe(startWith(content.value))),
    shareReplayOnce(),
  )
  const maybeActiveContentCoverImageGroup = getMaybeActiveContentCoverImageGroupControl().pipe(
    switchMap((control) => (!!control ? controlValueChanges : of(undefined))),
    shareReplayOnce(),
  ) as Observable<ImageGroup>
  maybeActiveContentCoverImageGroup.subscribe()
  return () => maybeActiveContentCoverImageGroup
}

/**
 * Returns the base64-encoded preview image from the user's device if the image has not yet been
 * uploaded; else, returns the URL of the uploaded image.
 */
export type GetMaybeActiveContentCoverImageGroup = ReturnType<typeof construct>
