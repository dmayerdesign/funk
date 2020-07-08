import { NgModule } from "@angular/core"
import { construct as constructBuildMenuItem } from "@funk/model/ui/atlas/actions/build-menu-item"
import { construct as constructHomeRelativeUrl } from "@funk/ui/app/atlas/home-relative-url"
import atlas from "@funk/ui/app/atlas/atlas"
import { APP_ATLAS, BUILD_MENU_ITEM, HOME_RELATIVE_URL } from "@funk/ui/app/atlas/tokens"

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
