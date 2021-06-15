import { GetMaybeActiveContentValueControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
) {
  const valueChanges = getMaybeActiveContentValueControl().pipe(
    ignoreNullish(),
    switchMap((content) => content.valueChanges.pipe(startWith(content.value))),
    shareReplayOnce(),
  )
  const maybeActiveContentValue = getMaybeActiveContentValueControl().pipe(
    switchMap((content) => (!!content ? valueChanges : of(undefined))),
    shareReplayOnce(),
  ) as Observable<string>
  maybeActiveContentValue.subscribe()
  return () => maybeActiveContentValue
}

export type GetMaybeActiveContentValue = ReturnType<typeof construct>
