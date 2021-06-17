import { GetMaybeActiveContentTitleControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentTitleControl: GetMaybeActiveContentTitleControl,
) {
  const maybeActiveContentTitle = getMaybeActiveContentTitleControl().pipe(
    switchMap(
      (control) =>
        control?.valueChanges?.pipe(startWith(control.value)) ?? of(undefined),
    ),
    shareReplayOnce(),
  ) as Observable<string>
  maybeActiveContentTitle.subscribe()
  return () => maybeActiveContentTitle
}

export type GetMaybeActiveContentTitle = ReturnType<typeof construct>
