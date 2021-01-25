import { UserRole } from "@funk/auth/domain/user-role"
import { AuthenticatedRequest } from "@funk/auth/plugins/internal/request-response/authenticated-request"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER]),
  (request, response) => {
    const { user } = (request as unknown) as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  },
)
