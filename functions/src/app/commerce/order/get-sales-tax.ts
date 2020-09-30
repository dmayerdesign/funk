import getSalesTax from "@funk/api/commerce/order/get-sales-tax"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/functions/helpers/http/map-request-to-body"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
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
