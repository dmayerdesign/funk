import { UserRole } from '@funk/model/auth/user-role'
import { authAdmin } from '@funk/plugins/auth/auth-admin'

export default async (): Promise<void> =>
{
  const me = await authAdmin().getUserByEmail('d.a.mayer92@gmail.com')
  if (me.emailVerified)
  {
    await authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
  }
}
