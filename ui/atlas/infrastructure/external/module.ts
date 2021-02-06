import { NgModule } from "@angular/core"
import { construct as constructHomeRelativeUrl } from "@funk/ui/atlas/application/external/home-relative-url"
import atlas from "@funk/ui/atlas/configuration"
import {
  APP_ATLAS,
  BUILD_MENU_ITEM,
  HOME_RELATIVE_URL,
} from "@funk/ui/atlas/infrastructure/external/tokens"
import { construct as constructBuildMenuItem } from "@funk/ui/atlas/model/behaviors/build-menu-item"

@NgModule({
  providers: [
    {
      provide: APP_ATLAS,
      useValue: atlas,
    },
    {
      provide: BUILD_MENU_ITEM,
      useFactory: constructBuildMenuItem,
      deps: [APP_ATLAS],
    },
    {
      provide: HOME_RELATIVE_URL,
      useFactory: constructHomeRelativeUrl,
    },
  ],
})
export class AtlasModule {}
