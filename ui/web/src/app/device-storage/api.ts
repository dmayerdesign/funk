import { Injectable } from '@angular/core'
import { DeviceStorageApi } from '@funk/ui/core/device-storage/api'
import { Storage } from '@ionic/storage'

@Injectable({ providedIn: 'root' })
export class IonicDeviceStorageApi implements DeviceStorageApi
{
  constructor(
    private _ionicStorage: Storage
  ) { }

  public upsert(key: string, value: any): void
  {
    this._ionicStorage.set(key, value)
  }

  public get(key: string): void
  {
    this._ionicStorage.get(key)
  }

  public delete(key: string): void
  {
    this._ionicStorage.remove(key)
  }
}
