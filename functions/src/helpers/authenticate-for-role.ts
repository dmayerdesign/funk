import { CustomClaims } from '@funk/shared/contracts/auth/custom-claims'
import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import { AuthenticationRequest } from '@funk/shared/contracts/data-access/authentication-request'
import { StatusCode, StatusCodeMessage } from '@funk/shared/contracts/http/status-code'
import { NextFunction, RequestHandler, Response } from 'express'
import { auth } from 'firebase-admin'
import { authenticate } from './authenticate'

export function authenticateForRole(role: UserRole): RequestHandler {
  return function(request: AuthenticationRequest, response: Response, next: NextFunction): Promise<boolean> {
    return authenticate(request, response, async function(): Promise<boolean> {
      const { status, send } = response
      const { user: idToken } = request as AuthenticatedRequest
      const user = await auth().getUser(idToken.uid)
      const claims = user.customClaims as CustomClaims
      if (claims && claims.role && claims.role === role) {
        next()
        return true
      }
      else {
        status(StatusCode.FORBIDDEN)
        send(StatusCodeMessage[StatusCode.FORBIDDEN])
        return false
      }
    })
  }
}
