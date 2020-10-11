import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RippleContainerDirective } from "@funk/ui/app/shims/ripple-container.directive"
import { TransparentHeaderContainerDirective } from "@funk/ui/plugins/style/page/transparent-header-container.directive"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [RippleContainerDirective, TransparentHeaderContainerDirective],
  exports: [RippleContainerDirective, TransparentHeaderContainerDirective],
})
export class AppCommonModule {}
