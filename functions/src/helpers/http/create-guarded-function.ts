import { UserRole } from '@funk/model/auth/user-role'
import { RequestHandler } from 'express'
import { HttpsFunction } from 'firebase-functions'
import authenticateForRoles from '../identity/authenticate-for-roles'
import createFunction from './create-function'
import { ResponseTypes } from './handle-request'

export default function<ResponseType extends ResponseTypes = undefined>(
  roles: UserRole[],
  ...handlers: RequestHandler[],
): HttpsFunction
{
  return createFunction<ResponseType>(
    authenticateForRoles(roles),
    ...handlers,
  )
}
