import { CustomRegions } from '../custom-regions/custom-regions'
import { NavigationItem } from '../navigation-item/navigation-item'

export interface UiContent {
    primaryNavigation?: NavigationItem[]
    customRegions?: CustomRegions
}
