import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { Observable } from "rxjs"
import {
  ORGANIZATIONS,
  PRIMARY_ORGANIZATION
} from "@funk/model/organization/organization"

export function construct(listenById: ListenById): Enterprise$ {
  return listenById<Enterprise>(
    ORGANIZATIONS,
    PRIMARY_ORGANIZATION
  ) as Observable<Enterprise>
}

export type Enterprise$ = Observable<Enterprise>
