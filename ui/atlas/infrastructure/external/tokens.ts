import { InjectionToken } from "@angular/core"
import { AppAtlas } from "@funk/ui/atlas/configuration"
import { BuildMenuItem } from "@funk/ui/atlas/domain/behaviors/build-menu-item"

export const APP_ATLAS = new InjectionToken<AppAtlas>("APP_ATLAS")
export const BUILD_MENU_ITEM = new InjectionToken<BuildMenuItem<AppAtlas>>(
  "BUILD_MENU_ITEM",
)
export const HOME_RELATIVE_URL = new InjectionToken<string>("HOME_RELATIVE_URL")
