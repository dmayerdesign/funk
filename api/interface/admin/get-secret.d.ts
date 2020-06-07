import { GetById } from "@funk/plugins/persistence/actions/get-by-id"

export default function getSecret(secretKey: string): Promise<string | undefined>

export declare function construct(
  getConfig: any,
  getById: GetById,
  createKmsClient: (options?: any) => any
): typeof getSecret

export type GetSecret = typeof getSecret
