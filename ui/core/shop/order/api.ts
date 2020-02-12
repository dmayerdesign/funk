import { Injectable } from '@angular/core'
import { Order, ORDERS } from '@funk/model/commerce/order/order'
import { UserHydrated } from '@funk/model/user/user-hydrated'
import { DeviceStorageApi } from '@funk/ui/core/device-storage/api'

@Injectable({ providedIn: 'root' })
export class OrderApi
{
  constructor(
    private _deviceStorageApi: DeviceStorageApi
  ) { }

  public createOrderForUser({ email, id }: UserHydrated): void
  {
    const order = {} as Order

    if (!email)
    {
      this._deviceStorageApi.upsert(`${ORDERS}.${id}`, order)
    }
    else
    {
      console.log('should persist the order to the database')
    }
  }
}
