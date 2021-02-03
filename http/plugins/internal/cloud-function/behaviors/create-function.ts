import { HandlerReturnTypes } from "@funk/http/plugins/internal/cloud-function/behaviors/handle-request"
import { HttpsFunction } from "@funk/http/plugins/internal/cloud-function/https-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
import { Application, Response } from "express"
import { https } from "firebase-functions"

export function construct() {
  return function <
    HandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
    RequestBodyType = any
  >(
    app: Application,
  ): HttpsFunction<
    RequestWithBody<RequestBodyType>,
    Response<HandlerReturnType>
  > {
    return https.onRequest(app)
  }
}

export default construct()
