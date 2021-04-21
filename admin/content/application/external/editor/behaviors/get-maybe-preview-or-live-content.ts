import { ListenById as ContentListenById } from "@funk/admin/content/application/external/behaviors/persistence/listen-by-id"
import { Content } from "@funk/admin/content/model/content"
import { ListenById as ContentPreviewListenById } from "@funk/admin/content/preview/application/external/behaviors/persistence/listen-by-id"
import { combineLatest, from, Observable } from "rxjs"
import { map } from "rxjs/operators"

export function construct(
  contentPreviewListenById: ContentPreviewListenById,
  contentListenById: ContentListenById,
) {
  return function (contentId: string): Observable<Content | undefined> {
    const maybeContent = combineLatest([
      from(contentPreviewListenById(contentId)).pipe(
        map((contentPreview) => contentPreview?.content),
      ),
      from(contentListenById(contentId)),
    ]).pipe(map(([preview, content]) => preview ?? content))

    maybeContent.subscribe()

    return maybeContent
  }
}

export type GetMaybePreviewOrLiveContent = ReturnType<typeof construct>
