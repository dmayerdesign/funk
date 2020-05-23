import list from '@funk/api/commerce/product/list'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import authenticateForRoles from '@funk/functions/helpers/identity/authenticate-for-roles'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { UserRole } from '@funk/model/auth/user-role'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER, UserRole.ADMINISTRATOR ]),
  async (
    { body }: RequestWithBody<Parameters<typeof list>[0]>
  ): Promise<DatabaseDocument[]> =>
  {
    return await list(body)
  },
)
