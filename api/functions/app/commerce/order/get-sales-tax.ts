import getSalesTax from "@funk/api/core/commerce/order/get-sales-tax"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/api/functions/helpers/http/map-request-to-body"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.PUBLIC,
    UserRole.ANONYMOUS,
  ]),
  mapRequestToBody(getSalesTax)
)
