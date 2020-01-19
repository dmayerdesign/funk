import createFunction from '@funk/functions/helpers/http/create-function'
import { ResponseTypes } from '@funk/functions/helpers/http/handle-request'
import authenticateForRoles from '@funk/functions/helpers/identity/authenticate-for-roles'
import { UserRole } from '@funk/model/auth/user-role'
import { RequestHandler } from 'express'
import { HttpsFunction } from 'firebase-functions'

export default function<ResponseType extends ResponseTypes = undefined>(
  roles: UserRole[],
  ...handlers: RequestHandler[]
): HttpsFunction
{
  return createFunction<ResponseType>(
    authenticateForRoles(roles),
    ...handlers,
  )
}
