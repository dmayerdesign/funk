import { DatabaseDocument } from '../data-access/database-document'
import { OrganizationBranding } from './organization-branding'
import { OrganizationRetailSettings } from './organization-retail-settings'

export enum OrganizationType {
  Business,
  NonProfit
}

export interface Organization extends DatabaseDocument {
  id: any
  name: string
  retailSettings: OrganizationRetailSettings
  branding: OrganizationBranding
  primaryUrl: string
  type?: OrganizationType
  dbaNames?: string[]
}
