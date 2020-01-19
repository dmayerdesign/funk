import { IdentityApi } from '@funk/ui/web/app/identity/api'

export function createAppInitializer(identityApi: IdentityApi): () => Promise<void> {
  return async function appInitializer(): Promise<void> {
    await identityApi.init()
  }
}
