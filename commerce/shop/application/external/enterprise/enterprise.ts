import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import { ListenById } from "@funk/organization/application/external/behaviors/persistence/listen-by-id"
import { PRIMARY_ORGANIZATION } from "@funk/organization/model/organization"
import { Observable } from "rxjs"

export function construct(listenById: ListenById): Enterprise$ {
  return listenById(PRIMARY_ORGANIZATION) as Observable<Enterprise>
}

export type Enterprise$ = Observable<Enterprise>
