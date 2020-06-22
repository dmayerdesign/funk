import { Observable } from "rxjs"
import { Cart } from
  "@funk/model/commerce/order/order"
import { construct as constructQueryCollectionForMeta } from
  "@funk/plugins/persistence/actions/query-collection-for-metadata"
import { construct as constructListenById } from
  "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructPopulate } from
  "@funk/plugins/persistence/actions/populate"
import { UserSession } from "@funk/ui/core/identity/user-session"

export function construct(
  userSession: UserSession,
  queryCollectionForMetadata: ReturnType<typeof constructQueryCollectionForMeta>,
  listenById: ReturnType<typeof constructListenById>,
  populate: ReturnType<typeof constructPopulate>
): Observable<Cart>

export type Cart$ = ReturnType<typeof construct>
