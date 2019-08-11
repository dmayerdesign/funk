import { AuthenticationRequest } from '@funk/shared/contracts/data-access/authentication-request'
import { NextFunction, Response } from 'express'
import { auth } from 'firebase-admin'

// Inspired by https://github.com/firebase/functions-samples/blob/6c284a689c484ac4395fde1a8e8d6c2731705b55/authorized-https-endpoint/functions/index.js
// Express middleware that validates a Firebase ID Tokens passed in the Authorization HTTP
// header or in the "__session" cookie.
// An Authorization header should look like this:
// `Authorization: Bearer <Firebase ID Token>`.
// When decoded successfully, the ID Token's content will be added as `req.user`.
export async function isAuthenticated(
  request: AuthenticationRequest,
  { status, send }: Response,
  next: NextFunction
): Promise<void> {
  try {
    const encodedIdToken = getEncodedIdTokenOrThrow()
    const decodedIdToken = await auth().verifyIdToken(encodedIdToken)
    request.user = decodedIdToken
    next()
  }
  catch (error) {
    console.error(error)
    status(403)
    send('UNAUTHORIZED')
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
