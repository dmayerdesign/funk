import { UserRole } from '@funk/model/auth/user-role'
import { AuthenticatedRequest } from '@funk/model/data-access/authenticated-request'
import createGuardedFunction from '../helpers/create-guarded-function'

export default createGuardedFunction(
  UserRole.SUPER,
  (request, response) => {
    const { user } = request as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  }
)
