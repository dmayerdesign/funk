import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import * as cookieParser from 'cookie-parser'
import authenticateForRole from '../helpers/authenticate-for-role'
import createCorsApp from '../helpers/create-cors-app'
import createFunction from '../helpers/create-function'

const app = createCorsApp(true)
app.use(cookieParser())
app.use(authenticateForRole(UserRole.SUPER))

export default createFunction((request, response) => {
  const { user } = request as AuthenticatedRequest
  response.send(`Hello ${user.name}`)
})
