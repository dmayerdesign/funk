import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { RequestHandler } from 'express'
import { HttpsFunction } from 'firebase-functions'
import authenticateForRole from './authenticate-for-role'
import createFunction from './create-function'

export default function(
  role: UserRole,
  ...handlers: RequestHandler[]
): HttpsFunction {
  return createFunction(
    authenticateForRole(role),
    ...handlers,
  )
}
