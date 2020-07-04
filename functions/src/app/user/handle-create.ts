import createPersonForNewUser from "@funk/api/user/create-person-for-new-user"
import setRoleForNewUser from "@funk/api/user/set-role-for-new-user"
import { authEvents } from "@funk/plugins/auth/auth-events"

export default authEvents().user().onCreate((user) =>
{
  setRoleForNewUser(user)
  createPersonForNewUser(user)
})
