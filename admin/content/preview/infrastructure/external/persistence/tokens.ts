import { InjectionToken } from "@angular/core"
import { DeleteById } from "@funk/admin/content/preview/application/external/behaviors/persistence/delete-by-id"
import type { GetById } from "@funk/admin/content/preview/application/external/behaviors/persistence/get-by-id"
import { List } from "@funk/admin/content/preview/application/external/behaviors/persistence/list"
import type { ListenById } from "@funk/admin/content/preview/application/external/behaviors/persistence/listen-by-id"
import { Marshall } from "@funk/admin/content/preview/application/external/behaviors/persistence/marshall"
import type { Populate } from "@funk/admin/content/preview/application/external/behaviors/persistence/populate"
import type { SetById } from "@funk/admin/content/preview/application/external/behaviors/persistence/set-by-id"
import type { UpdateById } from "@funk/admin/content/preview/application/external/behaviors/persistence/update-by-id"

export const DELETE_CONTENT_PREVIEW_BY_ID = new InjectionToken<DeleteById>(
  "DELETE_CONTENT_PREVIEW_BY_ID",
)
export const GET_CONTENT_PREVIEW_BY_ID = new InjectionToken<GetById>(
  "GET_CONTENT_PREVIEW_BY_ID",
)
export const LIST_CONTENT_PREVIEW = new InjectionToken<List>(
  "LIST_CONTENT_PREVIEW",
)
export const LISTEN_FOR_CONTENT_PREVIEW_BY_ID = new InjectionToken<ListenById>(
  "LISTEN_FOR_CONTENT_PREVIEW_BY_ID",
)
export const MARSHALL_CONTENT_PREVIEW = new InjectionToken<Marshall>(
  "MARSHALL_CONTENT_PREVIEW",
)
export const POPULATE_CONTENT_PREVIEW = new InjectionToken<Populate>(
  "POPULATE_CONTENT_PREVIEW",
)
export const SET_CONTENT_PREVIEW_BY_ID = new InjectionToken<SetById>(
  "SET_CONTENT_PREVIEW_BY_ID",
)
export const UPDATE_CONTENT_PREVIEW_BY_ID = new InjectionToken<UpdateById>(
  "UPDATE_CONTENT_PREVIEW_BY_ID",
)
