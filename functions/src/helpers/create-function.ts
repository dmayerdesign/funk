import { RequestHandler as ExpressRequestHandler } from 'express'
import { https, HttpsFunction } from 'firebase-functions'
import createApp from './create-app'
import handleRequest, { RequestHandler } from './handle-request'

export default function(
  handler: RequestHandler,
  ...middlewares: ExpressRequestHandler[]
): HttpsFunction {
  const _app = createApp()

  middlewares.forEach((middleware) => _app.use(middleware))

  _app.post('/', handleRequest(handler))

  return https.onRequest(_app)
}
