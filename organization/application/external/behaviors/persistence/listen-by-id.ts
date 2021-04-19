import { Populate } from "@funk/organization/application/external/behaviors/persistence/populate"
import {
  Organization,
  ORGANIZATIONS,
} from "@funk/organization/model/organization"
import { ListenById as GenericListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(listenById: GenericListenById, populate: Populate) {
  return function (documentPath: string): Observable<Organization | undefined> {
    return listenById(ORGANIZATIONS, documentPath).pipe(switchMap(populate))
  }
}

export type ListenById = ReturnType<typeof construct>
