import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import * as cookieParser from 'cookie-parser'
import { https } from 'firebase-functions'
import { authenticateForRole } from '../helpers/authenticate-for-role'
import { createCorsApp } from '../helpers/create-cors-app'

const app = createCorsApp(true)
app.use(cookieParser())
app.use(authenticateForRole(UserRole.SUPER))
app.get('/', (request, { send }) => {
  const { user } = request as AuthenticatedRequest
  send(`Hello ${user.name}`)
})

export default https.onRequest(app)
