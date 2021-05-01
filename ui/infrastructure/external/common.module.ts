import { AsyncPipe, CommonModule, DOCUMENT } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { DOM_GET_INNER_TEXT } from "@funk/admin/content/infrastructure/external/tokens"
import { AsyncNotNullPipe } from "@funk/ui/infrastructure/external/helpers/async-not-null.pipe"
import { construct as constructGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"
import { StickyHeaderContainerDirective } from "@funk/ui/plugins/external/style/page/sticky-header-container.directive"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [AsyncNotNullPipe, StickyHeaderContainerDirective],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AsyncNotNullPipe,
    StickyHeaderContainerDirective,
  ],
  providers: [
    {
      provide: DOM_GET_INNER_TEXT,
      useFactory: constructGetInnerText,
      deps: [DOCUMENT],
    },
    AsyncPipe,
  ],
})
export class AppCommonModule {}
