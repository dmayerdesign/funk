import {
  HandlerReturnTypes,
  RequestHandler,
} from "@funk/http/plugins/internal/cloud-function/behaviors/handle-request"
import { RequestWithBody } from "@funk/http/plugins/internal/server/request-with-body"

export default <
  BodyType extends any = any,
  ResponseType extends HandlerReturnTypes = HandlerReturnTypes
>(
  handlerFn: (options: BodyType) => ResponseType,
): RequestHandler<ResponseType, BodyType> => (
  request: RequestWithBody<BodyType>,
): ResponseType => handlerFn(request.body)
