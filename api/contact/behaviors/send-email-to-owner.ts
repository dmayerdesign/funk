import { OWNER_EMAIL } from "@funk/config"
import { ContactForm } from "@funk/model/contact/contact-form"
import sendEmailImpl from "@funk/api/plugins/email/behaviors/send"

export function construct(
  sendEmail = sendEmailImpl
)
{
  return async function({ name, emailAddress, message }: ContactForm): Promise<void>
  {
    await sendEmail({
      to: OWNER_EMAIL,
      from: {
        name: `${name} (via the contact form)`,
        email: emailAddress,
      },
      subject: `${name} submitted the contact form and is probably not a robot`,
      text: render({ name, emailAddress, message }),
    })
  }
}

function render({ name, message }: ContactForm): string
{
  return `
From: ${name}

Message:

${message}
  `
}

export default construct()

export type SendEmailToOwner = ReturnType<typeof construct>
