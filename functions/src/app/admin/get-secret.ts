import getSecret from "@funk/api/plugins/secrets/behaviors/get-secret"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/functions/model/request-response/request-with-body"
import { UserRole } from "@funk/model/auth/user-role"

export default createRpcFunction(
  authenticateForRoles([ UserRole.SUPER, UserRole.OWNER ]),
  async ({ body }: RequestWithBody<string>): Promise<string | undefined> =>
    await getSecret(body)
)
