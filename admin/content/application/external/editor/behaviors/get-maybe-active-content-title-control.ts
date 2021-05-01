import { FormControl } from "@angular/forms"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { Content } from "@funk/admin/content/model/content"
import { maybePluck, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { map } from "rxjs/operators"

export function construct(getMaybeActiveContent: GetMaybeActiveContent) {
  const maybeActiveContentTitleControl = getMaybeActiveContent().pipe(
    maybePluck("title" as keyof Content),
    map((title) => (title != null ? new FormControl(title) : undefined)),
    shareReplayOnce(),
  )
  maybeActiveContentTitleControl.subscribe()
  return () => maybeActiveContentTitleControl
}

export type GetMaybeActiveContentTitleControl = ReturnType<typeof construct>
