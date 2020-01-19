import createApp from '@funk/functions/helpers/http/create-app'
import handleRequest, { RequestHandler, ResponseTypes } from '@funk/functions/helpers/http/handle-request'
import { https, HttpsFunction } from 'firebase-functions'

export const construct = <
  ResponseType extends ResponseTypes = undefined,
  RequestBodyType = any
  >() =>
  {
    return function(
      ...handlers: [RequestHandler<ResponseType>, ...RequestHandler<ResponseType>[]]
    ): HttpsFunction
    {
      const _handlers = [ ...handlers ]
      const handler = _handlers.pop()!
      const middlewares = _handlers
      return https.onRequest(createApp().post('/',
        ...middlewares,
        handleRequest<ResponseType, RequestBodyType>(handler)
      ))
    }
  }

export default function<
  ResponseType extends ResponseTypes = undefined,
  RequestBodyType = any,
  >(
  ...handlers: [
    RequestHandler<ResponseType, RequestBodyType>,
    ...RequestHandler<ResponseType, RequestBodyType>[],
  ]
): HttpsFunction
{
  return construct<ResponseType, RequestBodyType>()(...handlers)
}
