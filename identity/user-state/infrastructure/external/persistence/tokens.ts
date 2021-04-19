import { InjectionToken } from "@angular/core"
import type { GetById } from "@funk/identity/user-state/application/external/behaviors/persistence/get-by-id"
import type { ListenById } from "@funk/identity/user-state/application/external/behaviors/persistence/listen-by-id"
import { Marshall } from "@funk/identity/user-state/application/external/behaviors/persistence/marshall"
import type { Populate } from "@funk/identity/user-state/application/external/behaviors/persistence/populate"
import type { SetById } from "@funk/identity/user-state/application/external/behaviors/persistence/set-by-id"
import type { UpdateById } from "@funk/identity/user-state/application/external/behaviors/persistence/update-by-id"

export const GET_USER_STATE_BY_ID = new InjectionToken<GetById>(
  "GET_USER_STATE_BY_ID",
)
export const LISTEN_FOR_USER_STATE_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_USER_STATE_BY_ID",
)
export const MARSHALL_USER_STATE = new InjectionToken<Marshall>(
  "MARSHALL_USER_STATE",
)
export const POPULATE_USER_STATE = new InjectionToken<Populate>(
  "POPULATE_USER_STATE",
)
export const SET_USER_STATE_BY_ID = new InjectionToken<SetById>(
  "SET_USER_STATE_BY_ID",
)
export const UPDATE_USER_STATE_BY_ID = new InjectionToken<UpdateById>(
  "UPDATE_USER_STATE_BY_ID",
)
