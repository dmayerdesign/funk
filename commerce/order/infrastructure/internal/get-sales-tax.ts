import { UserRole } from "@funk/auth/model/user-role"
import getSalesTax from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.PUBLIC,
    UserRole.ANONYMOUS,
  ]),
  mapRequestToBody(getSalesTax),
)
