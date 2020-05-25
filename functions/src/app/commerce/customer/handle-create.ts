import handleCreate from "@funk/api/commerce/customer/handle-create"
import { authEvents } from "@funk/plugins/auth/auth-events"

export default authEvents().user().onCreate(handleCreate)
