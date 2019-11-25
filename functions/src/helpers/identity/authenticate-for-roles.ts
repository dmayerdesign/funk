import { CustomClaims } from '@funk/model/auth/custom-claims'
import { UserRole } from '@funk/model/auth/user-role'
import { AuthenticatedRequest } from '@funk/model/data-access/authenticated-request'
import { AuthenticationRequest } from '@funk/model/data-access/authentication-request'
import { StatusCode, StatusCodeMessage } from '@funk/model/http/status-code'
import { NextFunction, RequestHandler, Response } from 'express'
import { auth } from 'firebase-admin'
import authenticate from './authenticate'

export default function(roles: UserRole[]): RequestHandler
{
  return function(
    request: AuthenticationRequest,
    response: Response,
    next: NextFunction,
  ): Promise<NextFunction | false>
  {
    return authenticate(request, response, async function(): Promise<NextFunction | false>
    {
      const { user } = request as AuthenticatedRequest
      const claims = (await auth().getUser(user.uid))
        .customClaims as CustomClaims | undefined

      console.log('got claims for user', JSON.stringify(claims))

      if (claims && claims.role && roles.some((role) => claims.role === role))
      {
        return next
      }
      else
      {
        if (!response.headersSent)
        {
          response.status(StatusCode.FORBIDDEN)
          response.send(StatusCodeMessage[StatusCode.FORBIDDEN])
        }
        return false
      }
    })
  }
}
