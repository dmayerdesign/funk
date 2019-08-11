import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import * as cookieParser from 'cookie-parser'
import { RequestHandler, Response } from 'express'
import * as functions from 'firebase-functions'
import { corsApp } from '../helpers/cors-app'
import { isAuthenticated } from '../helpers/is-authenticated'

const handler: RequestHandler = (request: AuthenticatedRequest, { send }: Response) => {
  const user = request.user
  if (user) {
    send(`Hello ${user.name}`)
  }
}

corsApp.use(cookieParser())
corsApp.use(isAuthenticated)
corsApp.all('/', handler)

export default functions.https.onRequest(corsApp)
