import { AuthenticatedRequest } from "@funk/functions/model/request-response/authenticated-request"
import { UserRole } from "@funk/model/auth/user-role"
import createRpcFunction from "../helpers/http/create-rpc-function"
import authenticateForRoles from "../helpers/identity/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER]),
  (request, response) => {
    const { user } = (request as unknown) as AuthenticatedRequest
    response.send(`Hello ${user.name}`)
  }
)
