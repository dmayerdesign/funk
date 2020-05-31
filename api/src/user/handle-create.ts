import { UserRole } from "@funk/model/auth/user-role"
import { USER_CONFIGS, UserConfig } from "@funk/model/identity/user-config"
import { authAdmin } from "@funk/plugins/auth/auth-admin"
import { UserRecord } from "@funk/plugins/auth/user-record"
import setById from "@funk/plugins/persistence/actions/set-by-id"

export default async function(user: UserRecord): Promise<any>
{
  if (user.email)
  {
    await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.PUBLIC })

    const newUserConfig: UserConfig = {
      id: user.uid,
      displayName: user.displayName,
      email: user.email,
      isAnonymous: false,
    }

    await setById(USER_CONFIGS, newUserConfig.id, newUserConfig)
  }
  else
  {
    await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })
  }
}
