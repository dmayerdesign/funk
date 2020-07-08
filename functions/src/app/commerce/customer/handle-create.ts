import handleCreate from "@funk/api/commerce/customer/handle-create"
import { authEvents } from "@funk/api/plugins/auth/auth-events"

export default authEvents().user().onCreate(handleCreate)
