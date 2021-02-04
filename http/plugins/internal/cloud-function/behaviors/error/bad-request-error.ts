import { StatusCode } from "@funk/http/model/status-code"

export class BadRequestError extends Error {
  public statusCode = StatusCode.BAD_REQUEST
}
