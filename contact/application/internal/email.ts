import { Organization } from "@funk/organization/model/organization"

type Sender = string | { name?: string; email: string }
type Recipient = string | { name?: string; email: string }

interface BaseEmailData {
  to: Recipient
  from: Sender
  subject: string
}

export type EmailData = BaseEmailData & ({ text: string } | { html: string })

export interface CreateEmailOptions {
  organization?: Organization
  styleOverrides?: {
    mastheadBgColor?: string
    accentColor?: string
    fontFamily?: string
    innerBgColor?: string
  }
}

export interface SendEmailOptions {
  fromName: string
  fromEmail: string
  toName?: string
  toEmail: string
  subject: string
  preheader?: string
  html?: string
  text?: string
}
