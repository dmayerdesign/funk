import { FormControl } from "@angular/forms"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { map } from "rxjs/operators"

export function construct(getMaybeActiveContent: GetMaybeActiveContent) {
  const maybeActiveContentCoverImageGroupControl = getMaybeActiveContent().pipe(
    map((maybeActiveContent) => {
      const imageGroup = (maybeActiveContent as Partial<ContentHtmlBlogPost>)
        ?.coverImageGroup
      return maybeActiveContent != null
        ? new FormControl(imageGroup)
        : undefined
    }),
    shareReplayOnce(),
  )
  maybeActiveContentCoverImageGroupControl.subscribe()
  return () => maybeActiveContentCoverImageGroupControl
}

export type GetMaybeActiveContentCoverImageGroupControl = ReturnType<
  typeof construct
>
