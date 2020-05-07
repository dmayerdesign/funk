import handleCreate from '@funk/api/user/handle-create'
import { authEvents } from '@funk/plugins/auth/auth-events'

export default authEvents().user().onCreate(handleCreate)
