import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { GetMaybeActiveContentValueControl } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value-control"
import { Observable, of } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl
) {
  const maybeActiveContentValue = getMaybeActiveContentValueControl().pipe(
    switchMap((content) => content?.valueChanges ?? of(undefined)),
    shareReplayOnce()
  ) as Observable<string>
  maybeActiveContentValue.subscribe()
  return () => maybeActiveContentValue
}

export type GetMaybeActiveContentValue = ReturnType<typeof construct>
