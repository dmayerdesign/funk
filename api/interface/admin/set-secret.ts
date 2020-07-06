import setSecretPluginImpl from "@funk/plugins/secrets/actions/set-secret"

export declare function construct(setSecretPlugin?: typeof setSecretPluginImpl): typeof setSecret

declare function setSecret(...args: Parameters<typeof setSecretPluginImpl>): Promise<string>
export default setSecret

export type SetSecret = typeof setSecret
