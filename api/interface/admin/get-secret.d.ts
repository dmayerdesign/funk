import getById from "@funk/plugins/persistence/actions/get-by-id"

declare function getSecret(secretKey: string): Promise<string | undefined>

export declare function construct(deps?: {
  getConfig: any
  getById: typeof getById
  createKmsClient: (options?: any) => any
}): typeof getSecret

export default getSecret
