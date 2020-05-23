import { AbstractPersistence } from '@funk/ui/core/persistence/interface'

export interface DeviceStorage extends AbstractPersistence {
  upsert(key: string, value: any): Promise<void>
  get(key: string): Promise<string | undefined>
  delete(key: string): Promise<void>
}

export const DEVICE_STORAGE = 'DEVICE_STORAGE'
