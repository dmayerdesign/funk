import { authEvents } from "@funk/auth/plugins/internal/auth-events"
import createPersonForNewUser from "@funk/user/application/internal/behaviors/create-person-for-new-user"
import createUserStateForNewUser from "@funk/user/application/internal/behaviors/create-user-state-for-new-user"
import setRoleForNewUser from "@funk/user/application/internal/behaviors/set-role-for-new-user"

export default authEvents()
  .user()
  .onCreate((user) => {
    setRoleForNewUser(user)
    createPersonForNewUser(user)
    createUserStateForNewUser(user)
  })
