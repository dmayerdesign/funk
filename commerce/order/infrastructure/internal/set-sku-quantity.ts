import { UserRole } from "@funk/auth/model/user-role"
import getById from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import updateById from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import { construct as constructSetSkuQuantity } from "@funk/commerce/order/application/internal/behaviors/set-sku-quantity"
import getSkuById from "@funk/commerce/sku/application/internal/behaviors/persistence/get-by-id"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"
import mapRequestToBody from "@funk/http/plugins/internal/cloud-function/behaviors/map-request-to-body"
import authenticateForRoles from "@funk/identity/application/internal/behaviors/authenticate-for-roles"

const setSkuQuantity = constructSetSkuQuantity(getById, updateById, getSkuById)
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
