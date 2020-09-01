import sendEmailToOwner from "@funk/api/contact/send-email-to-owner"
import createRpcFunction from "@funk/functions/helpers/http/create-rpc-function"
import authenticateForRoles from "@funk/functions/helpers/identity/authenticate-for-roles"
import { RequestWithBody } from "@funk/functions/model/request-response/request-with-body"
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
    await sendEmailToOwner(body)
)
