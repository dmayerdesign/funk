import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export abstract class DeviceStorageApi
{
  public abstract upsert(key: string, value: any): void
  public abstract get(key: string): void
  public abstract delete(key: string): void
}
