import createPersonForNewUser from "@funk/api/user/create-person-for-new-user"
import createUserStateForNewUser from "@funk/api/user/create-user-state-for-new-user"
import setRoleForNewUser from "@funk/api/user/set-role-for-new-user"
import { authEvents } from "@funk/api/plugins/auth/auth-events"

export default authEvents()
  .user()
  .onCreate((user) => {
    setRoleForNewUser(user)
    createPersonForNewUser(user)
    createUserStateForNewUser(user)
  })
