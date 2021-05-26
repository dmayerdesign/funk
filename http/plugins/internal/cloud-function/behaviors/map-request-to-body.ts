import {
  HandlerReturnTypes,
  RequestHandler,
} from "@funk/http/plugins/internal/cloud-function/behaviors/handle-request"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"

export default function <
  BodyType extends any = any,
  ResponseType extends HandlerReturnTypes = HandlerReturnTypes
>(
  handlerFn: (body: BodyType) => ResponseType,
): RequestHandler<ResponseType, BodyType> {
  return function (request: RequestWithBody<BodyType>): ResponseType {
    return handlerFn(request.body)
  }
}
