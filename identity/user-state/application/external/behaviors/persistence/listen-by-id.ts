import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { Populate } from "@funk/identity/user-state/application/external/behaviors/persistence/populate"
import { ListenById as GenericListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(listenById: GenericListenById, populate: Populate) {
  return function (documentPath: string): Observable<UserState | undefined> {
    return listenById<UserState>(USER_STATES, documentPath).pipe(
      switchMap(populate),
    )
  }
}

export type ListenById = ReturnType<typeof construct>
