import { https, HttpsFunction } from 'firebase-functions'
import app from './create-app'
import handleRequest, { RequestHandler, ResponseTypes } from './handle-request'

export default function<ResponseType extends ResponseTypes = undefined>(
  ...handlers: RequestHandler<ResponseType>[]
): HttpsFunction
{
  return https.onRequest(app().post('/',
    ...handlers.map((handler) => handleRequest<ResponseType>(handler))
  ))
}
