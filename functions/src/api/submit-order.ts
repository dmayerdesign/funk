import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import * as cookieParser from 'cookie-parser'
import { https } from 'firebase-functions'
import { createCorsApp } from '../helpers/create-cors-app'

const app = createCorsApp(true)
app.use(cookieParser())
// app.use(authenticate)
app.post('/', (request, response) => {
  const { user } = request as AuthenticatedRequest
  response.send(`Hello ${user ? user.name : 'Guest'}`)
})

export default https.onRequest(app)
