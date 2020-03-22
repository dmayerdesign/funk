import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import createOrderForCustomer
  from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { UserHydrated } from '@funk/model/identity/user-hydrated'
import { DeviceStorageApi } from '@funk/ui/core/device-storage/api'

@Injectable({ providedIn: 'root' })
export class OrderApi
{
  constructor(
    private _deviceStorageApi: DeviceStorageApi,
    private _store: AngularFirestore
  ) { }

  public createOrderForUser({ email, id }: UserHydrated): void
  {
    const order = createOrderForCustomer({ email, userId: id })

    if (!email)
    {
      this._deviceStorageApi.upsert(`${ORDERS}.${id}`, order)
    }
    else
    {
      this._store.collection(ORDERS)
        .doc(order.id)
        .set(order)
    }
  }
}
