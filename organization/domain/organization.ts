import { OrganizationBranding } from "@funk/organization/domain/organization-branding"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"

export interface Organization extends DatabaseDocument {
  id: PrimaryKey
  isPrimary?: boolean
  type: "enterprise" | "nonprofit"
  name: string
  branding: OrganizationBranding
  publicWebsiteUrl: string
  dbaNames?: string[]
  enterprises?: PrimaryKey[]
}

export const ORGANIZATIONS = "organizations"
export const PRIMARY_ORGANIZATION = "primary"
