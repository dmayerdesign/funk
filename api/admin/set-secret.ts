import setSecretPluginImpl from "@funk/api/plugins/secrets/behaviors/set-secret"

export function construct(setSecretPlugin = setSecretPluginImpl)
{
  return ([ options ]: Parameters<typeof setSecretPlugin>) => setSecretPlugin(options)
}
export default construct()

export type SetSecret = ReturnType<typeof construct>
