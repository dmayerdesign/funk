import { InjectionToken } from "@angular/core"
import type { GetById } from "@funk/identity/person/application/external/behaviors/persistence/get-by-id"
import type { ListenById } from "@funk/identity/person/application/external/behaviors/persistence/listen-by-id"
import { Marshall } from "@funk/identity/person/application/external/behaviors/persistence/marshall"
import type { Populate } from "@funk/identity/person/application/external/behaviors/persistence/populate"
import type { SetById } from "@funk/identity/person/application/external/behaviors/persistence/set-by-id"
import type { UpdateById } from "@funk/identity/person/application/external/behaviors/persistence/update-by-id"

export const GET_PERSON_BY_ID = new InjectionToken<GetById>("GET_PERSON_BY_ID")
export const LISTEN_FOR_PERSON_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_PERSON_BY_ID",
)
export const MARSHALL_PERSON = new InjectionToken<Marshall>("MARSHALL_PERSON")
export const POPULATE_PERSON = new InjectionToken<Populate>("POPULATE_PERSON")
export const SET_PERSON_BY_ID = new InjectionToken<SetById>("SET_PERSON_BY_ID")
export const UPDATE_PERSON_BY_ID = new InjectionToken<UpdateById>(
  "UPDATE_PERSON_BY_ID",
)
