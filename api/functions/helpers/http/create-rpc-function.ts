import createApp from "@funk/api/functions/helpers/http/create-app"
import createFunction from "@funk/api/functions/helpers/http/create-function"
import handleError from "@funk/api/functions/helpers/http/handle-error"
import handleRequest, {
  HandlerReturnTypes,
  RequestHandlers,
} from "@funk/api/functions/helpers/http/handle-request"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import { HttpsFunction } from "@funk/api/plugins/cloud-function/https-function"
import { Response } from "express"

export function construct() {
  return function <
    HandlerReturnType extends HandlerReturnTypes = HandlerReturnTypes,
    RequestBodyType = any
  >(
    ...handlers: RequestHandlers
  ): HttpsFunction<
    RequestWithBody<RequestBodyType>,
    Response<HandlerReturnType>
  > {
    const _handlers = [...handlers]
    const handler = _handlers.pop()!
    const middlewares = _handlers
    return createFunction<HandlerReturnType, RequestBodyType>(
      createApp().post(
        "/",
        ...middlewares,
        handleRequest<HandlerReturnType, RequestBodyType>(handler),
        handleError,
      ),
    )
  }
}

export default construct()
