import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { RequestHandler as ExpressRequestHandler } from 'express'
import { HttpsFunction } from 'firebase-functions'
import authenticateForRole from './authenticate-for-role'
import createFunction from './create-function'
import { RequestHandler } from './handle-request'

export default function(
  role: UserRole,
  handler: RequestHandler,
  ...middlewares: ExpressRequestHandler[]
): HttpsFunction {
  return createFunction(handler, authenticateForRole(role), ...middlewares)
}
