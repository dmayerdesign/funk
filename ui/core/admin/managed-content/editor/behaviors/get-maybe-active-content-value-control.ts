import { FormControl } from "@angular/forms"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { GetMaybeActiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content"
import { map } from "rxjs/operators"

export function construct(
  getMaybeActiveContent: GetMaybeActiveContent
)
{
  const maybeActiveContentValueControl = getMaybeActiveContent().pipe(
    maybePluck("value"),
    map((value) => value ? new FormControl(value) : undefined),
    shareReplayOnce())
  maybeActiveContentValueControl.subscribe()
  return () => maybeActiveContentValueControl
}

export type GetMaybeActiveContentValueControl = ReturnType<typeof construct>
