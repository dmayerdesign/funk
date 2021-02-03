import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { getStore$ } from "@funk/test/plugins/external/persistence/in-memory-store"
import { get } from "lodash"
import { Observable } from "rxjs"
import { distinctUntilKeyChanged, map } from "rxjs/operators"

export function construct() {
  return function <DocumentType extends Record<string, any> = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Observable<DocumentType | undefined> {
    const stream = getStore$().pipe(
      distinctUntilKeyChanged(collectionPath),
      map((store) =>
        get(store[collectionPath], documentPath.replace(/\//g, ".")),
      ),
      shareReplayOnce(),
    )
    stream.subscribe()
    return stream
  }
}
