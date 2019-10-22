import { AuthenticationRequest } from '@funk/shared/contracts/data-access/authentication-request'
import { StatusCode, StatusCodeMessage } from '@funk/shared/contracts/http/status-code'
import { NextFunction, Response } from 'express'
import { auth } from 'firebase-admin'

// Thanks to firebase/functions-samples for guidance:
// https://github.com/firebase/functions-samples/blob/6c284a689c484ac4395fde1a8e8d6c2731705b55/authorized-https-endpoint/functions/index.js
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
export default async function(
  request: AuthenticationRequest,
  response: Response,
  next: NextFunction
): Promise<boolean> {
  try {
    const encodedIdToken = getEncodedIdTokenOrThrow()
    const decodedIdToken = await auth().verifyIdToken(encodedIdToken)
    request.user = decodedIdToken
    next()
    return true
  }
  catch (error) {
    console.error(error)
    response.status(StatusCode.UNAUTHORIZED)
    response.send(StatusCodeMessage[StatusCode.UNAUTHORIZED])
    return false
  }

  function getEncodedIdTokenOrThrow(): string {
    const authHeader = request.headers.authorization as string | undefined
    if (authHeader && authHeader.startsWith('Bearer ')) {
      console.log('Found "Authorization" header.')
      return authHeader.split('Bearer ')[1]
    }
    else if (request.cookies && request.cookies.__session) {
      console.log('Found "__session" cookie.')
      return request.cookies.__session
    }
    throw new Error(
      'No Firebase ID token was found.' + '\n' +
      'Make sure you authorize your request by providing an HTTP header with the key' +
      '"Authorization" and the value "Bearer <Firebase ID Token>"' + '\n' +
      'or by passing a "__session" cookie.'
    )
  }
}
