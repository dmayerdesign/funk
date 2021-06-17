import { ListenById as ContentListenById } from "@funk/content/application/external/behaviors/persistence/listen-by-id"
import { Content } from "@funk/content/model/content"
import { ListenById as ContentPreviewListenById } from "@funk/content/preview/application/external/behaviors/persistence/listen-by-id"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { combineLatest, Observable } from "rxjs"
import { map } from "rxjs/operators"

export function construct(
  contentPreviewListenById: ContentPreviewListenById,
  contentListenById: ContentListenById,
) {
  return function (contentId: string): Observable<Content | undefined> {
    const maybeContent = combineLatest([
      contentPreviewListenById(contentId).pipe(
        map((contentPreview) => contentPreview?.content),
        shareReplayOnce(),
      ),
      contentListenById(contentId).pipe(shareReplayOnce()),
    ]).pipe(
      map(([preview, content]) => preview ?? content),
      shareReplayOnce(),
    )

    maybeContent.subscribe()

    return maybeContent
  }
}

export type GetMaybePreviewOrLiveContent = ReturnType<typeof construct>
