import { RequestHandler } from 'express'
import { https, HttpsFunction } from 'firebase-functions'
import app from './create-app'
import handleRequest from './handle-request'

export default function(
  ...handlers: RequestHandler[]
): HttpsFunction {
  return https.onRequest(app().post('/',
    ...handlers.map((handler) => handleRequest(handler))
  ))
}
