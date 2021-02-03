import { StatusCode } from "@funk/http/domain/status-code"

export interface ErrorWithStatusCode extends Error {
  statusCode: StatusCode
}
