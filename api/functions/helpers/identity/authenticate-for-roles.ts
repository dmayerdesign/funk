import authenticate from "@funk/api/functions/helpers/identity/authenticate"
import { AuthenticatedRequest } from "@funk/api/functions/model/request-response/authenticated-request"
import { AuthenticationRequest } from "@funk/api/functions/model/request-response/authentication-request"
import { authAdmin } from "@funk/api/plugins/auth/auth-admin"
import getVerifiedRole from "@funk/model/auth/behaviors/get-verified-role"
import { CustomClaims } from "@funk/model/auth/custom-claims"
import { UserRole } from "@funk/model/auth/user-role"
import { StatusCode, StatusCodeMessage } from "@funk/model/http/status-code"
import { NextFunction, RequestHandler, Response } from "express"

/**
 * Creates a `RequestHandler` which either calls `next` if the user has AT LEAST ONE of the
 * `roles`, or sends a `403 Forbidden` response if not.
 */
export default function (roles: UserRole[]): RequestHandler {
  // TODO: `request` is really an `AuthenticatedRequest`, and should be typed as such.
  // Currently using `AuthenticationRequest` here, and a type assertion below, to appease
  // the compiler.
  return function (
    request: AuthenticationRequest,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return authenticate(request, response, async function (): Promise<void> {
      const { uid } = (request as AuthenticatedRequest).user
      const user = await authAdmin().getUser(uid)
      const claims = user.customClaims as CustomClaims | undefined

      if (roles.some((role) => getVerifiedRole(user, claims) === role)) {
        return next()
      } else {
        if (!response.headersSent) {
          response.status(StatusCode.FORBIDDEN)
          response.send(StatusCodeMessage[StatusCode.FORBIDDEN])
        }
      }
    })
  }
}
