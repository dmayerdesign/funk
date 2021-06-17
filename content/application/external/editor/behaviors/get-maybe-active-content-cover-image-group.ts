import { GetMaybeActiveContentCoverImageGroupControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group-control"
import { ImageGroup } from "@funk/content/image-group/model/image-group"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentCoverImageGroupControl: GetMaybeActiveContentCoverImageGroupControl,
) {
  const maybeActiveContentCoverImageGroup = getMaybeActiveContentCoverImageGroupControl().pipe(
    switchMap(
      (control) =>
        control?.valueChanges?.pipe(startWith(control.value)) ?? of(undefined),
    ),
    shareReplayOnce(),
  ) as Observable<ImageGroup | undefined>
  maybeActiveContentCoverImageGroup.subscribe()
  return () => maybeActiveContentCoverImageGroup
}

/**
 * `url` is the base64-encoded preview image from the user's device if the image has not yet been
 * uploaded; else, `url` is the URL of the uploaded image.
 */
export type GetMaybeActiveContentCoverImageGroup = ReturnType<typeof construct>
