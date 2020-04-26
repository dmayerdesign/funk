import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { OrganizationBranding } from '@funk/model/organization/organization-branding'

export interface Organization extends DatabaseDocument {
  id: PrimaryKey
  type: 'enterprise'|'nonprofit'
  name: string
  branding: OrganizationBranding
  publicWebsiteUrl: string
  dbaNames?: string[]
  enterprises?: PrimaryKey[]
}
