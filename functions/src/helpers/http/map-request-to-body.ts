import { HandlerReturnTypes, RequestHandler } from '@funk/functions/helpers/http/handle-request'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'

export default<
    BodyType extends any = any,
    ResponseType extends HandlerReturnTypes = HandlerReturnTypes>(
  handlerFn: (options: BodyType) => ResponseType
): RequestHandler<ResponseType, BodyType> =>
  (request: RequestWithBody<BodyType>): ResponseType =>
    handlerFn(request.body)
