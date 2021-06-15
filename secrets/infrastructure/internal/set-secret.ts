import { UserRole } from "@funk/auth/model/user-role"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"
import setSecret from "@funk/secrets/application/internal/behaviors/set-secret"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  mapRequestToBody(setSecret),
)
