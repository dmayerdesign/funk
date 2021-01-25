import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { Timestamp } from "@funk/persistence/domain/timestamp"

export interface RpcRequest<InputType> extends DatabaseDocument {
  payload?: Partial<InputType>
  createdAt: Timestamp
  requestProtocolData: any
}

export interface RpcResponse<OutputType> extends DatabaseDocument {
  payload?: Partial<OutputType>
  responseProtocolData: any
  createdAt: Timestamp
}
