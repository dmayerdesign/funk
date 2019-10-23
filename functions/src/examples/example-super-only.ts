import { UserRole } from '@funk/shared/contracts/auth/user-role'
import { AuthenticatedRequest } from '@funk/shared/contracts/data-access/authenticated-request'
import createGuardedFunction from '../helpers/create-guarded-function'

export default createGuardedFunction(
  UserRole.SUPER,
  (request, response) => {
    const { user } = request as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  }
)
