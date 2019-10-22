import * as express from 'express'
import { HttpsFunction } from 'firebase-functions'
import createCorsApp from './create-cors-app'
import createFunction from './create-function'

export default function(
  origin: string | RegExp | string[] | RegExp[] | boolean,
  handler: express.RequestHandler,
  app?: express.Application
): HttpsFunction {
  return createFunction(handler, createCorsApp(origin, app))
}
