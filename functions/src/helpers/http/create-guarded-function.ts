import { UserRole } from '@funk/model/auth/user-role'
import { RequestHandler } from 'express'
import { HttpsFunction } from 'firebase-functions'
import authenticateForRoles from '../identity/authenticate-for-roles'
import createFunction from './create-function'

export default function(
  roles: UserRole[],
  ...handlers: RequestHandler[]
): HttpsFunction
{
  return createFunction(
    authenticateForRoles(roles),
    ...handlers,
  )
}
