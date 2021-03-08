import { Populate } from "@funk/identity/person/application/external/behaviors/persistence/populate"
import { Person, PERSONS } from "@funk/identity/person/model/person"
import { ListenById as GenericListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

export function construct(listenById: GenericListenById, populate: Populate) {
  return function (documentPath: string): Observable<Person | undefined> {
    return listenById<Person>(PERSONS, documentPath).pipe(switchMap(populate))
  }
}

export type ListenById = ReturnType<typeof construct>
