import { GetMaybeActiveContentValueControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { Observable, of } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
) {
  const maybeActiveContentValue = getMaybeActiveContentValueControl().pipe(
    switchMap(
      (control) =>
        control?.valueChanges?.pipe(startWith(control.value)) ?? of(undefined),
    ),
    shareReplayOnce(),
  ) as Observable<string>
  maybeActiveContentValue.subscribe()
  return () => maybeActiveContentValue
}

export type GetMaybeActiveContentValue = ReturnType<typeof construct>
