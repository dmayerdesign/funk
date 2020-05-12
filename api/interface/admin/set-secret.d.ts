import { store } from '@funk/plugins/persistence/server-store'

export interface Options {
  key: string
  value: string
}

declare function setSecret(options: Options): Promise<void>

export declare function construct(deps?: {
  getConfig: any
  store: typeof store
  createKmsClient: (options?: any) => any
}): typeof setSecret

export default setSecret
