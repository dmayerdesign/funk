import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import loudlyLog from '@funk/helpers/loudly-log'
import { UserRole } from '@funk/model/auth/user-role'
import { authAdmin } from '@funk/plugins/auth/auth-admin'

export default createRpcFunction<void>(async (): Promise<void> =>
{
  loudlyLog('called adminGrantSuperRoleToMe')
  const me = await authAdmin().getUserByEmail('d.a.mayer92@gmail.com')
  return authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
})
