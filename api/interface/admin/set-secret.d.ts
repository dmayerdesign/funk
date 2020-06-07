import { SetById } from "@funk/plugins/persistence/actions/set-by-id"

export interface Options {
  key: string
  value: string
}

export default function setSecret(options: Options): Promise<void>

export declare function construct(deps?: {
  getConfig: any
  setById: SetById
  createKmsClient: (options?: any) => any
}): typeof setSecret

export type SetSecret = typeof setSecret
