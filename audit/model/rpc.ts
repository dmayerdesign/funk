import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { Instant } from "@funk/time/model/instant"

export interface RpcRequest<InputType> extends DatabaseDocument {
  payload?: Partial<InputType>
  createdAt: Instant
  requestProtocolData: any
}

export interface RpcResponse<OutputType> extends DatabaseDocument {
  payload?: Partial<OutputType>
  responseProtocolData: any
  createdAt: Instant
}
