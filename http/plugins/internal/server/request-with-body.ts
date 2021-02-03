import { RequestMethod } from "@funk/http/domain/request-method"
import { Request } from "express"

export interface RequestWithBody<BodyType = unknown> extends Request {
  body: BodyType
  method: string | RequestMethod
}
