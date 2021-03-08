import { OrganizationBranding } from "@funk/organization/model/organization-branding"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export interface Organization extends DatabaseDocument {
  id: PrimaryKey
  isPrimary?: boolean
  type: "enterprise" | "nonprofit"
  name: string
  branding: OrganizationBranding
  publicWebsiteUrl: string
  dbaNames?: string[]
}

export const ORGANIZATIONS = "organizations"
export const PRIMARY_ORGANIZATION = "primary"
