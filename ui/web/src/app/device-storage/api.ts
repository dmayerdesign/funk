import { Plugins } from '@capacitor/core'
import { DeviceStorage } from '@funk/ui/core/device-storage/interface'

const { Storage } = Plugins

export class DeviceStorageApi implements DeviceStorage
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
