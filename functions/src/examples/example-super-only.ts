import { UserRole } from '@funk/model/auth/user-role'
import { AuthenticatedRequest } from '@funk/model/data-access/authenticated-request'
import createGuardedFunction from '../helpers/http/create-guarded-function'

export default createGuardedFunction(
  UserRole.SUPER,
  (request, response) =>
  {
    const { user } = request as unknown as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  }
)
