import { HttpClient } from '@angular/common/http'
import createUid from '@funk/helpers/create-uid'
import { Order, Status } from '@funk/model/commerce/order/order'
import { createStubbedIdentityApi } from '@funk/ui/core/identity/stubs'
import { PersistenceApiStub } from '@funk/ui/core/persistence/stubs'
import { ShopApi } from '@funk/ui/core/shop/api'
import { createStateManagerStub } from '@funk/ui/web/app/stubs'
import { of } from 'rxjs'

export const CART_STUB: Partial<Order> = {
  status: Status.CART,
  skus: [],
  customer: { userId: createUid() },
  idempotencyKey: createUid(),
}

const createHttpClientStub = () => ({
  post: (..._args: any[]) => of({}),
}) as HttpClient

export const createDefaultShopApiStub = () =>
  new ShopApi(
    createHttpClientStub(),
    createStateManagerStub(),
    new PersistenceApiStub({}),
    createStubbedIdentityApi(),
  )
