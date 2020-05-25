import { HandlerReturnTypes } from "@funk/functions/helpers/http/handle-request"
import { RequestWithBody } from "@funk/functions/model/request-response/request-with-body"
import { HttpsFunction } from "@funk/plugins/cloud-function/https-function"
import { Application, Response } from "express"
import { https } from "firebase-functions"

export const construct = () =>
  function<
    HandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
    RequestBodyType = any>
  (app: Application): HttpsFunction<
  RequestWithBody<RequestBodyType>, Response<HandlerReturnType>>
  {
    return https.onRequest(app)
  }

export default construct()
