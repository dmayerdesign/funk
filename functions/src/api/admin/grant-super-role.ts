import createFunction from '@funk/functions/helpers/http/create-function'
import { UserRole } from '@funk/model/auth/user-role'
import { auth } from 'firebase-admin'

export default createFunction<void>(async (): Promise<void> =>
{
  const me = await auth().getUserByEmail('d.a.mayer92@gmail.com')
  console.log('got user', me)
  return auth().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
})
