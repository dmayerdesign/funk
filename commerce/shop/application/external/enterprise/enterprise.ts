import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import {
  ORGANIZATIONS,
  PRIMARY_ORGANIZATION,
} from "@funk/organization/model/organization"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Observable } from "rxjs"

export function construct(listenById: ListenById): Enterprise$ {
  return listenById<Enterprise>(
    ORGANIZATIONS,
    PRIMARY_ORGANIZATION,
  ) as Observable<Enterprise>
}

export type Enterprise$ = Observable<Enterprise>
