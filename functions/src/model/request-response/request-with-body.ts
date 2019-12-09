import { Request } from 'express'

export interface RequestWithBody<BodyType = unknown> extends Request
{
  body: BodyType
}
