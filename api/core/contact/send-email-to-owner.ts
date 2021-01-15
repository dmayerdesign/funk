import isHumanImpl from "@funk/api/core/contact/is-human"
import sendEmailImpl from "@funk/api/plugins/email/behaviors/send"
import { CLIENT_APP_URL, OWNER_EMAIL } from "@funk/configuration"
import { ContactForm } from "@funk/model/contact/contact-form"
import throwIfContactFormIsInvalid from "@funk/model/contact/validators/throw-if-contact-form-is-invalid"
import { ForbiddenError } from "@funk/model/error/forbidden-error"

const CLIENT_APP_DOMAIN = CLIENT_APP_URL.split("//")[1]

export function construct(
  sendEmail: typeof sendEmailImpl,
  isHuman: typeof isHumanImpl,
) {
  /**
   * @throws {InvalidInputError}
   */
  return async function (contactForm: ContactForm): Promise<void> {
    throwIfContactFormIsInvalid(contactForm)
    const { name, emailAddress, message, turingTestToken } = contactForm
    const _isHuman = await isHuman(turingTestToken)
    if (!_isHuman) {
      throw new ForbiddenError(
        "The user submitting this form appears to be a robot.",
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

export default construct(sendEmailImpl, isHumanImpl)

export type SendEmailToOwner = ReturnType<typeof construct>
