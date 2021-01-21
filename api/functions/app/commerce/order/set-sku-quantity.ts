import { construct as constructSetSkuQuantity } from "@funk/api/core/commerce/order/set-sku-quantity"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import mapRequestToBody from "@funk/api/functions/helpers/http/map-request-to-body"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import getById from "@funk/api/plugins/persistence/behaviors/get-by-id"
import updateById from "@funk/api/plugins/persistence/behaviors/update-by-id"
import { UserRole } from "@funk/model/auth/user-role"

const setSkuQuantity = constructSetSkuQuantity(getById, updateById)
export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.PUBLIC,
    UserRole.ANONYMOUS,
  ]),
  mapRequestToBody(setSkuQuantity),
)
