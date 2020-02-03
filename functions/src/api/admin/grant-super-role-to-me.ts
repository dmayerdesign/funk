import createRpcFunction from '@funk/functions/helpers/http/create-rpc-function'
import { UserRole } from '@funk/model/auth/user-role'
import { authAdmin } from '@funk/plugins/auth/auth-admin'

export default createRpcFunction<void>(async (): Promise<void> =>
{
  const me = await authAdmin().getUserByEmail('d.a.mayer92@gmail.com')
  if (me.emailVerified)
  {
    await authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
  }
})
