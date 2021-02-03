import setSecret from "@funk/admin/plugins/internal/secrets/behaviors/set-secret"
import { UserRole } from "@funk/auth/domain/user-role"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([UserRole.SUPER, UserRole.OWNER]),
  mapRequestToBody(setSecret),
)
