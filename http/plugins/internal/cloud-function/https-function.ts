import { HttpsFunction as HttpsFunctionImpl } from "firebase-functions"

export type HttpsFunction<
  RequestType = Request,
  ResponseType = Response
> = HttpsFunctionImpl
