import grantSuperRoleToMe from "@funk/api/core/admin/grant-super-role-to-me"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"

export default createRpcFunction<void>(grantSuperRoleToMe)
