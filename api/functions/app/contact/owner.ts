import sendEmailToOwner from "@funk/api/core/contact/send-email-to-owner"
import createRpcFunction from "@funk/api/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/api/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/api/functions/model/request-response/request-with-body"
import { UserRole } from "@funk/model/auth/user-role"
import { ContactForm } from "@funk/model/contact/contact-form"

export default createRpcFunction(
  authenticateForRoles([
    UserRole.SUPER,
    UserRole.OWNER,
    UserRole.ADMINISTRATOR,
    UserRole.PUBLIC,
    UserRole.ANONYMOUS,
  ]),
  async ({ body }: RequestWithBody<ContactForm>): Promise<void> =>
    await sendEmailToOwner(body),
)
