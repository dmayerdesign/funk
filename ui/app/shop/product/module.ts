import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { ProductListItemComponent } from "@funk/ui/app/shop/product/list-item.component"
import { ProductListComponent } from "@funk/ui/app/shop/product/list.component"
import { ProductListContainer } from "@funk/ui/app/shop/product/list.container"
import { IonicModule } from "@ionic/angular"

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
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
