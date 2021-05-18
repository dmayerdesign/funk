import { InjectionToken } from "@angular/core"
import { PageTitle } from "@funk/ui/atlas/application/external/page-title"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"

export const WINDOW = new InjectionToken<Window>("WINDOW")
export const DEVICE_WIDTH = new InjectionToken<DeviceWidth>("DEVICE_WIDTH")
export const PAGE_TITLE = new InjectionToken<PageTitle>("PAGE_TITLE")
export const CAN_LOAD_INTEGRATION_TEST = new InjectionToken<() => boolean>(
  "CAN_LOAD_INTEGRATION_TEST",
)
