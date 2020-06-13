import { Request, Response } from "express"

export type HttpsFunction<RequestType = Request, ResponseType = Response> =
  (req: RequestType, resp: ResponseType) => void
