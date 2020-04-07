import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductListItemComponent } from '@funk/ui/web/app/shop/product/list-item.component'
import { ProductListComponent } from '@funk/ui/web/app/shop/product/list.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    ProductListItemComponent,
    ProductListComponent,
  ],
  exports: [
    ProductListItemComponent,
    ProductListComponent,
  ],
})
export class ProductModule
{ }
