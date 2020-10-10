import { InjectionToken } from "@angular/core"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { SetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"
import { Populate } from "@funk/ui/plugins/persistence/behaviors/populate"
import { QueryCollectionForMetadata } from "@funk/ui/plugins/persistence/behaviors/query-collection-for-metadata"

export const LISTEN_BY_ID = new InjectionToken<ListenById>("LISTEN_BY_ID")
export const GET_BY_ID = new InjectionToken<GetById>("GET_BY_ID")
export const SET_BY_ID = new InjectionToken<SetById>("SET_BY_ID")
export const UPDATE_BY_ID = new InjectionToken<UpdateById>("UPDATE_BY_ID")
export const POPULATE = new InjectionToken<Populate<unknown, any>>("POPULATE")
export const QUERY_COLLECTION_FOR_METADATA = new InjectionToken<
  QueryCollectionForMetadata
>("QUERY_COLLECTION_FOR_METADATA")
