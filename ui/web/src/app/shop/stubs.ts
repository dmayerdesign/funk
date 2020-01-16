import { HttpClient } from '@angular/common/http'
import { AngularFirestore } from '@angular/fire/firestore'
import createUid from '@funk/helpers/create-uid'
import { Order, Status } from '@funk/model/commerce/order/order'
import { createDefaultIdentityApiStub } from '@funk/ui/web/app/identity/stubs'
import { ShopApi } from '@funk/ui/web/app/shop/api'
import { createStateManagerStub } from '@funk/ui/web/app/stubs'
import { of } from 'rxjs'
import { shareReplay } from 'rxjs/operators'

export const CART_STUB: Partial<Order> = {
  status: Status.CART,
  skus: [],
  customer: { userId: createUid() },
  idempotencyKey: createUid(),
}

const PRODUCTS_STUB = [] as any[]

const createHttpClientStub = () => ({
  post: (..._args: any[]) => of({}),
}) as HttpClient

const createStoreStub = () => ({
  doc: (..._docArgs: any[]) => ({
    valueChanges: (..._valueChangesArgs: any[]) => of(CART_STUB).pipe(shareReplay(1)),
  }),
  collection: (..._collectionArgs: any[]) => ({
    valueChanges: (..._valueChangesArgs: any[]) => of(PRODUCTS_STUB).pipe(shareReplay(1)),
    ref: { where: (..._args1: any[]) => ({ where: (..._args2: any[]) => ({
      limit: (..._args3: any[]) => ({ get: async (..._args4: string[]) => ({
        docs: [{
          ref: { path: 'testDocPath' },
        }],
      }) }),
    }) }) },
  }),
}) as AngularFirestore

export const createDefaultShopApiStub = () =>
  new ShopApi(
    createHttpClientStub(),
    createStateManagerStub(),
    createStoreStub(),
    createDefaultIdentityApiStub(),
  )
