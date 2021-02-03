import createApp from "@funk/http/plugins/internal/cloud-function/behaviors/create-app"
import createFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-function"
import handleError from "@funk/http/plugins/internal/cloud-function/behaviors/handle-error"
import handleRequest, {
  HandlerReturnTypes,
  RequestHandlers,
} from "@funk/http/plugins/internal/cloud-function/behaviors/handle-request"
import { HttpsFunction } from "@funk/http/plugins/internal/cloud-function/https-function"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"
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
