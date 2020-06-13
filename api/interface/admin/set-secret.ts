import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

export interface Options {
  key: string
  value: string
}

declare function setSecret(options: Options): Promise<void>
export default setSecret

export declare function construct(
  getConfig: any,
  setById: SetById,
  createKmsClient: (options?: any) => any
): typeof setSecret

export type SetSecret = typeof setSecret
