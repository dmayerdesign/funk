
import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { TransparentHeaderContainerDirective } from
  "@funk/ui/app/page/transparent-header-container.directive"
import { RippleContainerDirective } from "@funk/ui/app/shims/ripple-container.directive"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    RippleContainerDirective,
    TransparentHeaderContainerDirective,
  ],
  exports: [
    RippleContainerDirective,
    TransparentHeaderContainerDirective,
  ],
})
export class AppCommonModule
{ }
