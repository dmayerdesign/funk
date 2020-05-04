import getSecret from '@funk/functions/helpers/admin/get-secret'
import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import authenticateForRoles from '@funk/functions/helpers/identity/authenticate-for-roles'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { UserRole } from '@funk/model/auth/user-role'
import { GetSecretInput } from '@funk/model/secret/get-secret-input'

export default createRpcFunction<Promise<string>>(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER ]),
  async ({ body }: RequestWithBody<GetSecretInput>): Promise<string | undefined> =>
  {
    return await getSecret({ secretKey: body.secretKey })
  }
)
