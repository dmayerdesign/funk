import { Organization } from '@funk/model/organization/organization'

export interface EmailStyleOptions {
  mastheadBgColor: string
  accentColor: string
  fontFamily: string
  innerBgColor: string
}

export interface EmailOptions {
  fromName: string
  fromEmail: string
  toName?: string
  toEmail: string
  subject: string
  preheader?: string
  html?: string
  text?: string
  organization: Organization
}
