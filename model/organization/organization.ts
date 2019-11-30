import { OrganizationRetailSettings } from '@funk/model/commerce/organization/organization-retail-settings'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { OrganizationBranding } from './organization-branding'

export const enum OrganizationType
{
  BUSINESS = 'BUSINESS',
  NONPROFIT = 'NONPROFIT',
}

export interface Organization extends DatabaseDocument
{
  id: any
  name: string
  retailSettings: OrganizationRetailSettings
  branding: OrganizationBranding
  publicWebsiteUrl: string
  type?: OrganizationType
  dbaNames?: string[]
}
