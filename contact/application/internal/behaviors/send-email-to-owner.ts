import getIsHumanImpl from "@funk/auth/plugins/internal/turing-test/behaviors/get-is-human"
import { CLIENT_APP_URL, OWNER_EMAIL } from "@funk/configuration"
import { ContactForm } from "@funk/contact/domain/contact-form"
import throwIfContactFormIsInvalid from "@funk/contact/domain/validators/throw-if-contact-form-is-invalid"
import sendEmailImpl from "@funk/contact/plugins/internal/email/behaviors/send"
import { ForbiddenError } from "@funk/error/domain/forbidden-error"

const CLIENT_APP_DOMAIN = CLIENT_APP_URL.split("//")[1]

export function construct(
  sendEmail: typeof sendEmailImpl,
  getIsHuman: typeof getIsHumanImpl,
) {
  /**
   * @throws {InvalidInputError}
   */
  return async function (contactForm: ContactForm): Promise<void> {
    throwIfContactFormIsInvalid(contactForm)
    const { name, emailAddress, message, turingTestToken } = contactForm
    const isHuman = await getIsHuman(turingTestToken)
    if (!isHuman) {
      throw new ForbiddenError(
        "The user submitting this form seems to be a robot.",
      )
    }
    await sendEmail({
      to: OWNER_EMAIL,
      from: {
        name: `${name} (via the contact form at ${CLIENT_APP_DOMAIN})`,
        email: emailAddress,
      },
      subject: `${name} submitted the contact form`,
      text: render({ name, message }),
    })
  }
}

function render({
  name,
  message,
}: Pick<ContactForm, "name" | "message">): string {
  return `
From: ${name}

Message:

${message}
  `
}

export default construct(sendEmailImpl, getIsHumanImpl)

export type SendEmailToOwner = ReturnType<typeof construct>
