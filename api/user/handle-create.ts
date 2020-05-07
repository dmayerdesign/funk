import loudlyLog from '@funk/helpers/loudly-log'
import { UserRole } from '@funk/model/auth/user-role'
import { UserConfig, USER_CONFIGS } from '@funk/model/identity/user-config'
import { authAdmin } from '@funk/plugins/auth/auth-admin'
import { UserRecord } from '@funk/plugins/auth/user-record'
import { store } from '@funk/plugins/persistence/server-store'

export default async function(user: UserRecord): Promise<any>
{
  loudlyLog('user', user)

  await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })

  if (user.email)
  {
    const newUserConfig: UserConfig = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      isAnonymous: false,
    }

    await store().collection(USER_CONFIGS)
      .doc(newUserConfig.id)
      .set(newUserConfig)
  }
}
