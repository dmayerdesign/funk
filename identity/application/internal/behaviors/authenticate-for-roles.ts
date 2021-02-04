import getVerifiedRole from "@funk/auth/model/behaviors/get-verified-role"
import { CustomClaims } from "@funk/auth/model/custom-claims"
import { UserRole } from "@funk/auth/model/user-role"
import { authAdmin } from "@funk/auth/plugins/internal/auth-admin"
import { AuthenticatedRequest } from "@funk/auth/plugins/internal/request-response/authenticated-request"
import { AuthenticationRequest } from "@funk/auth/plugins/internal/request-response/authentication-request"
import { StatusCode, StatusCodeMessage } from "@funk/http/model/status-code"
import authenticate from "@funk/identity/application/internal/behaviors/authenticate"
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
    next: NextFunction,
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
