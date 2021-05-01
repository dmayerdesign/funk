import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserContent, USER_CONTENTS } from "@funk/identity/model/user-content"
import { Populate } from "@funk/identity/user-content/application/external/behaviors/persistence/populate"
import { ListenById as GenericListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(listenById: GenericListenById, populate: Populate) {
  return function (documentPath: string): Observable<UserContent | undefined> {
    const userContentChanges = listenById<UserContent>(
      USER_CONTENTS,
      documentPath,
    ).pipe(switchMap(populate), shareReplayOnce())
    userContentChanges.subscribe()
    return userContentChanges
  }
}

export type ListenById = ReturnType<typeof construct>
