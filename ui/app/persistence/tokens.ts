import { InjectionToken } from "@angular/core"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { construct as constructPopulate } from "@funk/plugins/persistence/actions/populate"
import { construct as constructQueryCollectionForMetadata } from
  "@funk/plugins/persistence/actions/query-collection-for-metadata"

export const LISTEN_BY_ID =
  new InjectionToken<ReturnType<typeof constructListenById>>("LISTEN_BY_ID")
export const GET_BY_ID = new InjectionToken<GetById>("GET_BY_ID")
export const SET_BY_ID = new InjectionToken<ReturnType<typeof constructSetById>>("SET_BY_ID")
export const UPDATE_BY_ID =
  new InjectionToken<ReturnType<typeof constructUpdateById>>("UPDATE_BY_ID")
export const POPULATE = new InjectionToken<ReturnType<typeof constructPopulate>>("POPULATE")
export const QUERY_COLLECTION_FOR_METADATA =
  new InjectionToken<ReturnType<typeof constructQueryCollectionForMetadata>>(
    "QUERY_COLLECTION_FOR_METADATA")
