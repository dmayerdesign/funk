import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/api/functions/helpers/http/map-request-to-body"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import setSecret from "@funk/api/plugins/secrets/behaviors/set-secret"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  mapRequestToBody(setSecret),
)
