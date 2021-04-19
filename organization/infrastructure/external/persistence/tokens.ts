import { InjectionToken } from "@angular/core"
import { ListenById } from "@funk/organization/application/external/behaviors/persistence/listen-by-id"
import { Populate } from "@funk/organization/application/external/behaviors/persistence/populate"

export const LISTEN_FOR_ORGANIZATION_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_ORGANIZATION_BY_ID",
)
export const POPULATE_ORGANIZATION = new InjectionToken<Populate>(
  "POPULATE_ORGANIZATION",
)
