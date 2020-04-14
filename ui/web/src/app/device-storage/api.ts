import { Injectable } from '@angular/core'
import { Plugins } from '@capacitor/core'
import { DeviceStorageApi } from '@funk/ui/core/device-storage/api'

const { Storage } = Plugins

@Injectable({ providedIn: 'root' })
export class IonicDeviceStorageApi implements DeviceStorageApi
{
  public upsert(key: string, value: any): void
  {
    Storage.set({ key, value })
  }

  public get(key: string): void
  {
    Storage.get({ key })
  }

  public delete(key: string): void
  {
    Storage.remove({ key })
  }
}
