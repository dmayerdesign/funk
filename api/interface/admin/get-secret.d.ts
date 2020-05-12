import { store } from '@funk/plugins/persistence/server-store'

declare function getSecret(secretKey: string): Promise<string | undefined>

export declare function construct(deps?: {
  getConfig: any
  store: typeof store
  createKmsClient: (options?: any) => any
}): typeof getSecret


export default getSecret
