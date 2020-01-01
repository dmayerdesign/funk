import createFunction from '@funk/functions/helpers/http/create-function'
import { UserRole } from '@funk/model/auth/user-role'
import { authAdmin } from '@funk/plugins/auth/auth-admin'

export default createFunction<void>(async (): Promise<void> =>
{
  const me = await authAdmin().getUserByEmail('d.a.mayer92@gmail.com')
  return authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
})
