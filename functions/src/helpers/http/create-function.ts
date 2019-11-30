import { https, HttpsFunction } from 'firebase-functions'
import createApp from './create-app'
import handleRequest, { RequestHandler, ResponseTypes } from './handle-request'

export default function<ResponseType extends ResponseTypes = undefined>(
  ...handlers: RequestHandler<ResponseType>[]
): HttpsFunction
{
  const _handlers = [ ...handlers ]
  const handler = _handlers.pop()!
  const middlewares = _handlers
  return https.onRequest(createApp().post('/',
    ...middlewares,
    handleRequest<ResponseType>(handler)
  ))
}
