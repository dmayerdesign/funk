import { StatusCode } from "@funk/model/http/status-code"

export class BadRequestError extends Error
{
  public statusCode = StatusCode.BAD_REQUEST
}
