import { IdentityApi } from './identity/api'

export function createAppInitializer(identityApi: IdentityApi): () => Promise<void> {
  return async function appInitializer(): Promise<void> {
    await identityApi.init()
  }
}
