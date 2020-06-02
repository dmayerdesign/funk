import createApp from "@funk/functions/helpers/http/create-app"
import createFunction from "@funk/functions/helpers/http/create-function"
import handleRequest, { HandlerReturnTypes, RequestHandlers }
  from "@funk/functions/helpers/http/handle-request"
import { RequestWithBody } from "@funk/functions/model/request-response/request-with-body"
import { HttpsFunction } from "@funk/plugins/cloud-function/https-function"
import { Response } from "express"

export function construct()
{
  return function<
    HandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
    RequestBodyType = any>
  (
    ...handlers: RequestHandlers
  ): HttpsFunction<RequestWithBody<RequestBodyType>, Response<HandlerReturnType>>
  {
    const _handlers = [ ...handlers ]
    const handler = _handlers.pop()!
    const middlewares = _handlers
    return createFunction<HandlerReturnType, RequestBodyType>(createApp().post("/",
      ...middlewares,
      handleRequest<HandlerReturnType, RequestBodyType>(handler)
    ))
  }
}

export default construct()
