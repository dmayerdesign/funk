import grantSuperRoleToMe from "@funk/admin/content/application/internal/behaviors/grant-super-role-to-me"
import createRpcFunction from "@funk/http/plugins/internal/cloud-function/behaviors/create-rpc-function"

export default createRpcFunction<void>(grantSuperRoleToMe)
