import { UserRole } from '@funk/shared/contracts/auth/user-role'
import * as express from 'express'
import { https, HttpsFunction } from 'firebase-functions'
import authenticateForRole from './authenticate-for-role'
import createApp from './create-app'

export default function(
  role: UserRole,
  handler: express.RequestHandler,
  app?: express.Application
): HttpsFunction {
  const _app = app || createApp()
  _app.get('/', handler)
  _app.use(authenticateForRole(role))
  return https.onRequest(_app)
}
