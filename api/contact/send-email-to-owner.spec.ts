import { IsHuman } from "@funk/api/contact/is-human"
import { construct } from "@funk/api/contact/send-email-to-owner"
import { Send } from "@funk/api/plugins/email/behaviors/send"
import { OWNER_EMAIL } from "@funk/config"
import { ContactForm } from "@funk/model/contact/contact-form"

describe("sendEmailToOwner", () =>
{
  let sendEmail: Send
  let isHuman: IsHuman
  let sendEmailToOwner: ReturnType<typeof construct>

  beforeEach(() =>
  {
    sendEmail = jest.fn().mockImplementation(() => Promise.resolve())
    isHuman = jest.fn().mockResolvedValue(true)
    sendEmailToOwner = construct(sendEmail, isHuman)
  })

  it("should send an email to the site owner", async () =>
  {
    const EMAIL: ContactForm = {
      name: "name",
      emailAddress: "email address",
      message: "message",
      turingTestToken: "turing test token",
    }

    await sendEmailToOwner(EMAIL)

    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
      to: OWNER_EMAIL,
      text: expect.stringContaining(EMAIL.message),
    }))
  })
})
