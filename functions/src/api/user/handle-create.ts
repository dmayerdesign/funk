import loudlyLog from '@funk/helpers/loudly-log'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig, USER_CONFIGS } from '@funk/model/identity/user-config'
import { authAdmin } from '@funk/plugins/auth/auth-admin'
import { authEvents } from '@funk/plugins/auth/auth-events'
import { store } from '@funk/plugins/db/store'

export default authEvents().user().onCreate(async function(user): Promise<any>
{
  loudlyLog('user', user)

  await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })

  if (user.email)
  {
    const newUserConfig: UserConfig = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
    }

    await store().collection(USER_CONFIGS)
      .doc(newUserConfig.id)
      .set(newUserConfig)
  }
})
