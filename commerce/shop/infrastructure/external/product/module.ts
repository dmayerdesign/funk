import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ProductListItemComponent } from "@funk/commerce/shop/infrastructure/external/product/list-item.component"
import { ProductListComponent } from "@funk/commerce/shop/infrastructure/external/product/list.component"
import { ProductListContainer } from "@funk/commerce/shop/infrastructure/external/product/list.container"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [
    ProductListItemComponent,
    ProductListComponent,
    ProductListContainer,
  ],
  exports: [
    ProductListItemComponent,
    ProductListComponent,
    ProductListContainer,
  ],
})
export class ProductModule {}
