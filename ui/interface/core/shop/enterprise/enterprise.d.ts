import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { ListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { Observable } from "rxjs"

export function construct(
  listenById: ListenById
): Enterprise$

export type Enterprise$ = Observable<Enterprise>
