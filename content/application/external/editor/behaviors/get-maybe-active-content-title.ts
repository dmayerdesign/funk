import { GetMaybeActiveContentTitleControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentTitleControl: GetMaybeActiveContentTitleControl,
) {
  const valueChanges = getMaybeActiveContentTitleControl().pipe(
    ignoreNullish(),
    switchMap((content) => content.valueChanges.pipe(startWith(content.value))),
    shareReplayOnce(),
  )
  const maybeActiveContentTitle = getMaybeActiveContentTitleControl().pipe(
    switchMap((content) => (!!content ? valueChanges : of(undefined))),
    shareReplayOnce(),
  ) as Observable<string>
  maybeActiveContentTitle.subscribe()
  return () => maybeActiveContentTitle
}

export type GetMaybeActiveContentTitle = ReturnType<typeof construct>
