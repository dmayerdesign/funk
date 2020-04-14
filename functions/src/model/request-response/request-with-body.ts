import { RequestMethod } from '@funk/model/http/request-method'
import { Request } from 'express'

export interface RequestWithBody<BodyType = unknown> extends Request
{
  body: BodyType
  method: string | RequestMethod
}
