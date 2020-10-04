import { NgModule } from "@angular/core"
import { construct as constructBuildMenuItem } from "@funk/model/ui/atlas/behaviors/build-menu-item"
import { APP_ATLAS, BUILD_MENU_ITEM, HOME_RELATIVE_URL } from "@funk/ui/app/atlas/tokens"
import atlas from "@funk/ui/core/atlas/atlas"
import { construct as constructHomeRelativeUrl } from "@funk/ui/core/atlas/home-relative-url"

@NgModule({
  providers: [
    {
      provide: APP_ATLAS,
      useValue: atlas,
    },
    {
      provide: BUILD_MENU_ITEM,
      useFactory: constructBuildMenuItem,
      deps: [ APP_ATLAS ],
    },
    {
      provide: HOME_RELATIVE_URL,
      useFactory: constructHomeRelativeUrl,
    },
  ],
})
export class AtlasModule
{ }
