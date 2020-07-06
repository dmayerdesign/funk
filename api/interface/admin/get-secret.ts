import getSecretPluginImpl from "@funk/plugins/secrets/actions/get-secret"

export declare function construct(getSecretPlugin?: typeof getSecretPluginImpl): typeof getSecret

declare function getSecret(key: string): Promise<string>
export default getSecret

export type GetSecret = typeof getSecret
