import createGuardedFunction from '@funk/functions/helpers/http/create-guarded-function'
import { AuthenticatedRequest } from '@funk/functions/model/request-response/authenticated-request'
import { UserRole } from '@funk/model/auth/user-role'

export default createGuardedFunction(
  [ UserRole.SUPER ],
  (request, response) =>
  {
    const { user } = request as unknown as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  }
)
