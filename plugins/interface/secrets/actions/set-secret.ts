import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

interface Options {
  key: string
  value: string
}

export declare function construct(
  getConfig: any,
  setById: SetById,
  createKmsClient: (options?: any) => any
): typeof setSecret

declare function setSecret(options: Options): Promise<void>
export default setSecret

export type SetSecret = typeof setSecret
