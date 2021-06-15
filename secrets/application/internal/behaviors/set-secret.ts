import setSecretPluginImpl from "@funk/secrets/plugins/internal/encrypted-storage/behaviors/set-secret"

export function construct(setSecretPlugin: typeof setSecretPluginImpl) {
  return (...options: Parameters<typeof setSecretPlugin>) =>
    setSecretPlugin(...options)
}
export default construct(setSecretPluginImpl)

export type SetSecret = ReturnType<typeof construct>
