import getSecretPluginImpl from "@funk/secrets/plugins/internal/encrypted-storage/behaviors/get-secret"

export function construct(getSecretPlugin: typeof getSecretPluginImpl) {
  return (...options: Parameters<typeof getSecretPlugin>) =>
    getSecretPlugin(...options)
}
export default construct(getSecretPluginImpl)

export type GetSecret = ReturnType<typeof construct>
