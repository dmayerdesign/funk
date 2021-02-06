import { StatusCode } from "@funk/http/model/status-code"

export interface ErrorWithStatusCode extends Error {
  statusCode: StatusCode
}
