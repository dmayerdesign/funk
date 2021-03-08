import { CommonModule, DOCUMENT } from "@angular/common"
import { NgModule } from "@angular/core"
import { DOM_GET_INNER_TEXT } from "@funk/admin/content/infrastructure/external/tokens"
import { construct as constructGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"
import { StickyHeaderContainerDirective } from "@funk/ui/plugins/external/style/page/sticky-header-container.directive"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [StickyHeaderContainerDirective],
  exports: [StickyHeaderContainerDirective],
  providers: [
    {
      provide: DOM_GET_INNER_TEXT,
      useFactory: constructGetInnerText,
      deps: [DOCUMENT],
    },
  ],
})
export class AppCommonModule {}
