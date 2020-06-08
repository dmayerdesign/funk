import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { Timestamp } from "@funk/model/data-access/timestamp"

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
