import { CustomClaims } from '@funk/model/auth/custom-claims'
import { UserRole } from '@funk/model/auth/user-role'
import { AuthenticatedRequest } from '@funk/model/data-access/authenticated-request'
import { AuthenticationRequest } from '@funk/model/data-access/authentication-request'
import { StatusCode, StatusCodeMessage } from '@funk/model/http/status-code'
import { NextFunction, RequestHandler, Response } from 'express'
import { auth } from 'firebase-admin'
import authenticate from './authenticate'

export default function(role: UserRole): RequestHandler {
  return function(request: AuthenticationRequest, response: Response, next: NextFunction): Promise<boolean> {
    return authenticate(request, response, async function(): Promise<boolean> {
      const { user: idToken } = request as AuthenticatedRequest
      const user = await auth().getUser(idToken.uid)
      const claims = user.customClaims as CustomClaims
      if (claims && claims.role && claims.role === role) {
        next()
        return true
      }
      else {
        response.status(StatusCode.FORBIDDEN)
        response.send(StatusCodeMessage[StatusCode.FORBIDDEN])
        return false
      }
    })
  }
}