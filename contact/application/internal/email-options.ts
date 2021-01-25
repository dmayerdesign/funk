import { Organization } from "@funk/organization/domain/organization"

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
