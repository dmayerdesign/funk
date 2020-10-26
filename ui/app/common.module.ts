import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
// import { RippleContainerDirective } from "@funk/ui/app/shims/ripple-container.directive"
import { StickyHeaderContainerDirective } from "@funk/ui/plugins/style/page/sticky-header-container.directive"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [StickyHeaderContainerDirective],
  exports: [StickyHeaderContainerDirective],
})
export class AppCommonModule {}
