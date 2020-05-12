export interface DeviceStorage {
  upsert(key: string, value: any): void
  get(key: string): void
  delete(key: string): void
}

export const DEVICE_STORAGE = 'DEVICE_STORAGE'
