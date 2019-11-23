import getSecret from '@funk/functions/helpers/admin/get-secret'
import createGuardedFunction from '@funk/functions/helpers/http/create-guarded-function'
import { UserRole } from '@funk/model/auth/user-role'

export default createGuardedFunction([ UserRole.SUPER ], async ({ body }): Promise<string> =>
{
  const secretKey: string = body['secretKey']
  return getSecret(secretKey)
})
