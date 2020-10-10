import { HttpsFunction as ConcreteHttpsFunction } from "firebase-functions"

export type HttpsFunction<
  RequestType = Request,
  ResponseType = Response
> = ConcreteHttpsFunction
