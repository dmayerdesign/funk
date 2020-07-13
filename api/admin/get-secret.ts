import getSecretPluginImpl from "@funk/api/plugins/secrets/actions/get-secret"

export function construct(getSecretPlugin = getSecretPluginImpl)
{
  return ([ options ]: Parameters<typeof getSecretPlugin>) => getSecretPlugin(options)
}
export default construct()

export type GetSecret = ReturnType<typeof construct>