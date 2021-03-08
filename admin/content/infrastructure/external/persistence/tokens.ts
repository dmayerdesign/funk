import { InjectionToken } from "@angular/core"
import type { GetById } from "@funk/admin/content/application/external/behaviors/persistence/get-by-id"
import type { ListenById } from "@funk/admin/content/application/external/behaviors/persistence/listen-by-id"
import { Marshall } from "@funk/admin/content/application/external/behaviors/persistence/marshall"
import type { Populate } from "@funk/admin/content/application/external/behaviors/persistence/populate"
import type { SetById } from "@funk/admin/content/application/external/behaviors/persistence/set-by-id"
import type { UpdateById } from "@funk/admin/content/application/external/behaviors/persistence/update-by-id"

export const GET_CONTENT_BY_ID = new InjectionToken<GetById>(
  "GET_CONTENT_BY_ID",
)
export const LISTEN_FOR_CONTENT_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_CONTENT_BY_ID",
)
export const MARSHALL_CONTENT = new InjectionToken<Marshall>("MARSHALL_CONTENT")
export const POPULATE_CONTENT = new InjectionToken<Populate>("POPULATE_CONTENT")
export const SET_CONTENT_BY_ID = new InjectionToken<SetById>(
  "SET_CONTENT_BY_ID",
)
export const UPDATE_CONTENT_BY_ID = new InjectionToken<UpdateById>(
  "UPDATE_CONTENT_BY_ID",
)
