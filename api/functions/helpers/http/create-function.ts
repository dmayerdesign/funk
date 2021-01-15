import { HandlerReturnTypes } from "@funk/api/functions/helpers/http/handle-request"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import { HttpsFunction } from "@funk/api/plugins/cloud-function/https-function"
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
