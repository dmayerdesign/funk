import { InjectionToken } from "@angular/core"
import type { GetById } from "@funk/identity/user-content/application/external/behaviors/persistence/get-by-id"
import type { ListenById } from "@funk/identity/user-content/application/external/behaviors/persistence/listen-by-id"
import { Marshall } from "@funk/identity/user-content/application/external/behaviors/persistence/marshall"
import type { Populate } from "@funk/identity/user-content/application/external/behaviors/persistence/populate"
import type { SetById } from "@funk/identity/user-content/application/external/behaviors/persistence/set-by-id"
import type { UpdateById } from "@funk/identity/user-content/application/external/behaviors/persistence/update-by-id"

export const GET_USER_CONTENT_BY_ID = new InjectionToken<GetById>(
  "GET_USER_CONTENT_BY_ID",
)
export const LISTEN_FOR_USER_CONTENT_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_USER_CONTENT_BY_ID",
)
export const MARSHALL_USER_CONTENT = new InjectionToken<Marshall>(
  "MARSHALL_USER_CONTENT",
)
export const POPULATE_USER_CONTENT = new InjectionToken<Populate>(
  "POPULATE_USER_CONTENT",
)
export const SET_USER_CONTENT_BY_ID = new InjectionToken<SetById>(
  "SET_USER_CONTENT_BY_ID",
)
export const UPDATE_USER_CONTENT_BY_ID = new InjectionToken<UpdateById>(
  "UPDATE_USER_CONTENT_BY_ID",
)
