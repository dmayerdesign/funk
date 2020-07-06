import { GetById } from "@funk/plugins/persistence/actions/get-by-id"

declare function getSecret(secretKey: string): Promise<string | undefined>
export default getSecret

export declare function construct(
  getConfig: any,
  getById: GetById,
  createKmsClient: (options?: any) => any
): typeof getSecret

export type GetSecret = typeof getSecret
