import { StatusCode } from '@funk/model/http/status-code'

export interface ErrorWithStatusCode extends Error
{
  statusCode: StatusCode
}
