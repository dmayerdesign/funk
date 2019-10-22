import * as express from 'express'
import { https, HttpsFunction } from 'firebase-functions'
import createApp from './create-app'

export default function(
  handler: express.RequestHandler,
  app?: express.Application
): HttpsFunction {
  const _app = app || createApp()
  _app.get('/', handler)
  return https.onRequest(_app)
}
