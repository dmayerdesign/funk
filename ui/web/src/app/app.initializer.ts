import { IdentityApi } from './identity/api'

export async function appInitializer(identityApi: IdentityApi): Promise<void> {
  await identityApi.init()
}
