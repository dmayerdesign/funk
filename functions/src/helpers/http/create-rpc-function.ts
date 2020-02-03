import createApp from '@funk/functions/helpers/http/create-app'
import handleRequest, { HandlerReturnTypes, RequestHandlers }
  from '@funk/functions/helpers/http/handle-request'
import { HttpsFunction } from '@funk/plugins/cloud-function/https-function'
import createFunction from './create-function'

export const construct = <
  ResponseType extends HandlerReturnTypes = undefined,
  RequestBodyType = any
>() =>
{
  return function(
    ...handlers: RequestHandlers
  ): HttpsFunction
  {
    const _handlers = [ ...handlers ]
    const handler = _handlers.pop()!
    const middlewares = _handlers
    return createFunction(createApp().post('/',
      ...middlewares,
      handleRequest<ResponseType, RequestBodyType>(handler)
    ))
  }
}

export default function<
  ResponseType extends HandlerReturnTypes = undefined,
  RequestBodyType = any,
>(...handlers: RequestHandlers): HttpsFunction
{
  return construct<ResponseType, RequestBodyType>()(...handlers)
}
