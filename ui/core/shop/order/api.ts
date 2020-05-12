import { Inject, Injectable } from '@angular/core'
import createOrderForCustomer
  from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { UserHydrated } from '@funk/model/identity/user-hydrated'
import { DeviceStorage, DEVICE_STORAGE } from '@funk/ui/core/device-storage/interface'
import { Persistence, PERSISTENCE } from '@funk/ui/core/persistence/interface'

@Injectable({ providedIn: 'root' })
export class OrderApi
{
  constructor(
    @Inject(DEVICE_STORAGE) private _deviceStorage: DeviceStorage,
    @Inject(PERSISTENCE) private _persistence: Persistence,
  )
  { }

  public createOrderForUser({ email, id }: UserHydrated): void
  {
    const order = createOrderForCustomer({ email, userId: id })

    if (!email)
    {
      this._deviceStorage.upsert(`${ORDERS}.${order.id}`, order)
    }
    else
    {
      this._persistence.setById(ORDERS, order.id, order)
    }
  }
}
