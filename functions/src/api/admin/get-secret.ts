import getSecret from '@funk/functions/helpers/admin/get-secret'
import createGuardedFunction from '@funk/functions/helpers/http/create-guarded-function'
import { RequestWithBody } from '@funk/functions/model/request-response/request-with-body'
import { UserRole } from '@funk/model/auth/user-role'
import { GetSecretInput } from '@funk/model/secret/get-secret-input'

export default createGuardedFunction<string>(
  [ UserRole.SUPER ],
  async ({ body }: RequestWithBody<GetSecretInput>): Promise<string> =>
  {
    return await getSecret({ secretKey: body.secretKey })
  })
