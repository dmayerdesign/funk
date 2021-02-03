import { StatusCode } from "@funk/http/domain/status-code"

export class BadRequestError extends Error {
  public statusCode = StatusCode.BAD_REQUEST
}
