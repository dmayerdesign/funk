import { UserRole } from "@funk/auth/model/user-role"
import { construct as constructSetSkuQuantity } from "@funk/commerce/order/application/internal/behaviors/set-sku-quantity"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"
import getById from "@funk/persistence/application/internal/behaviors/get-by-id"
import updateById from "@funk/persistence/application/internal/behaviors/update-by-id"

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
