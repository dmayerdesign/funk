import { InjectionToken } from "@angular/core"
import { PageTitle } from "@funk/ui/core/atlas/page-title"
import { DeviceWidth } from "@funk/ui/plugins/layout/device-width"

export const WINDOW = new InjectionToken<Window>("WINDOW")
export const DEVICE_WIDTH = new InjectionToken<DeviceWidth>("DEVICE_WIDTH")
export const PAGE_TITLE = new InjectionToken<PageTitle>("PAGE_TITLE")
