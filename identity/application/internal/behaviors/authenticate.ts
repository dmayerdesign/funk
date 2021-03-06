import { authAdmin } from "@funk/auth/plugins/internal/auth-admin"
import { AuthenticationRequest } from "@funk/auth/plugins/internal/request-response/authentication-request"
import { StatusCode, StatusCodeMessage } from "@funk/http/model/status-code"
import { NextFunction, Response } from "express"

/**
 * Express middleware that checks whether the request contains a user in the form of a
 * Firebase ID Token. The token may be passed in the `Authorization` header or in the
 * "__session" cookie. The value of the `Authorization` header should look like this:
 *
 * `Bearer <Firebase ID Token>`
 *
 * If decoded successfully, the ID Token's content will be assigned to the `user` property
 * of `request`.
 */
export default async function (
  request: AuthenticationRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const encodedIdToken = getEncodedIdTokenOrThrow()
    const decodedIdToken = await authAdmin().verifyIdToken(encodedIdToken)
    request.user = decodedIdToken
    return next()
  } catch (error) {
    console.error(error)
    response.status(StatusCode.UNAUTHORIZED)
    response.send(StatusCodeMessage[StatusCode.UNAUTHORIZED])
    return
  }

  function getEncodedIdTokenOrThrow(): string {
    const authHeader = request.headers.authorization as string | undefined
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split("Bearer ")[1]
    } else if (request.cookies && request.cookies.__session) {
      return request.cookies.__session
    }
    throw new Error(
      "No Firebase ID token was found.\n" +
        "Make sure you authorize your request by providing an HTTP header with the key" +
        '"Authorization" and the value "Bearer <Firebase ID Token>"\n' +
        'or by passing a "__session" cookie.',
    )
  }
}
