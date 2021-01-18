import { InjectionToken } from "@angular/core"
import { BuildMenuItem } from "@funk/model/ui/atlas/behaviors/build-menu-item"
import { AppAtlas } from "@funk/ui/configuration/atlas"

export const APP_ATLAS = new InjectionToken<AppAtlas>("APP_ATLAS")
export const BUILD_MENU_ITEM = new InjectionToken<BuildMenuItem<AppAtlas>>(
  "BUILD_MENU_ITEM",
)
export const HOME_RELATIVE_URL = new InjectionToken<string>("HOME_RELATIVE_URL")
