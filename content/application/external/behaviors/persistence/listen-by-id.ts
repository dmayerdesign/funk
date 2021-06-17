import { Populate } from "@funk/content/application/external/behaviors/persistence/populate"
import { Content, CONTENTS } from "@funk/content/model/content"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { ListenById as GenericListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(listenById: GenericListenById, populate: Populate) {
  return function (documentPath: string): Observable<Content | undefined> {
    return listenById<Content>(CONTENTS, documentPath).pipe(
      switchMap(populate),
      shareReplayOnce(),
    )
  }
}

export type ListenById = ReturnType<typeof construct>
