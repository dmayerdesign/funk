import { InjectionToken } from "@angular/core"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { ListByIds } from "@funk/persistence/application/external/behaviors/list-by-ids"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Populate } from "@funk/persistence/application/external/behaviors/populate"
import { QueryCollectionForMetadata } from "@funk/persistence/application/external/behaviors/query-collection-for-metadata"
import { SetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export const LISTEN_BY_ID = new InjectionToken<ListenById>("LISTEN_BY_ID")
export const LIST_BY_IDS = new InjectionToken<ListByIds>("LIST_BY_IDS")
export const GET_BY_ID = new InjectionToken<GetById>("GET_BY_ID")
export const SET_BY_ID = new InjectionToken<SetById>("SET_BY_ID")
export const UPDATE_BY_ID = new InjectionToken<UpdateById>("UPDATE_BY_ID")
export const POPULATE = new InjectionToken<Populate<unknown, any>>("POPULATE")
export const QUERY_COLLECTION_FOR_METADATA = new InjectionToken<
  QueryCollectionForMetadata
>("QUERY_COLLECTION_FOR_METADATA")
