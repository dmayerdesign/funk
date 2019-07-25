import { Entity } from '../data-access/entity'
import { GlobalStyles } from '../global-styles/global-styles'
import { OrganizationBranding } from '../organization-branding/organization-branding'
import { OrganizationRetailSettings } from '../organization-retail-settings/organization-retail-settings'
import { StoreUiSettings } from '../store-ui-settings/store-ui-settings'
import { Taxonomy } from '../taxonomy/taxonomy'
import { UiContent } from '../ui-content/ui-content'

export enum OrganizationType {
    Business,
    NonProfit
}

export interface Organization extends Entity {
    id: any
    name: string
    retailSettings: OrganizationRetailSettings
    branding: OrganizationBranding
    storeUrl: string
    storeUiContent: UiContent
    type?: OrganizationType
    dbaNames?: string[]
    blogUiContent?: UiContent
    storeUiSettings?: StoreUiSettings
    searchableTaxonomies?: Taxonomy[]
    globalStyles?: GlobalStyles
    defaultsHaveBeenSet?: boolean
}
