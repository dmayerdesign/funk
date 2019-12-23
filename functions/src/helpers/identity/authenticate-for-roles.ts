import { AuthenticatedRequest } from
  '@funk/functions/model/request-response/authenticated-request'
import { AuthenticationRequest } from
  '@funk/functions/model/request-response/authentication-request'
import { CustomClaims } from '@funk/model/auth/custom-claims'
import { UserRole } from '@funk/model/auth/user-role'
import { StatusCode, StatusCodeMessage } from '@funk/model/http/status-code'
import { NextFunction, RequestHandler, Response } from 'express'
import { auth } from 'firebase-admin'
import authenticate from './authenticate'

/**
 * Creates a `RequestHandler` which calls `next` if the user has AT LEAST ONE of the
 * `roles`, and sends a `403 Forbidden` response if not.
 */
export default function(roles: UserRole[]): RequestHandler
{
  // TODO: `request` is really an `AuthenticatedRequest`, and should be typed as such.
  // Currently using `AuthenticationRequest` here, and a type assertion below, to appease
  // the compiler.
  return function(
    request: AuthenticationRequest,
    response: Response,
    next: NextFunction,
  ): Promise<void>
  {
    return authenticate(
      request,
      response,
      async function(): Promise<void>
      {
        const { uid } = (request as AuthenticatedRequest).user
        const user = await auth().getUser(uid)
        const claims = user.customClaims as CustomClaims | undefined

        if (claims && claims.role && roles.some((role) => claims.role === role))
        {
          return next()
        }
        else
        {
          if (!response.headersSent)
          {
            response.status(StatusCode.FORBIDDEN)
            response.send(StatusCodeMessage[StatusCode.FORBIDDEN])
          }
        }
      })
  }
}