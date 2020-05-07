import grantSuperRoleToMe from '@funk/api/admin/grant-super-role-to-me'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'

export default createRpcFunction<void>(grantSuperRoleToMe)
