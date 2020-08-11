import { InjectionToken } from "@angular/core"
import { construct as constructListenById } from
  "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { construct as constructUpdateById } from
  "@funk/ui/plugins/persistence/behaviors/update-by-id"
import { construct as constructPopulate } from "@funk/ui/plugins/persistence/behaviors/populate"
import { construct as constructQueryCollectionForMetadata } from
  "@funk/ui/plugins/persistence/behaviors/query-collection-for-metadata"

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
