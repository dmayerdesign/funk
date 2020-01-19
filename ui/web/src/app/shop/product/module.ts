import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductListItemComponent } from '@funk/ui/web/app/shop/product/list-item.component'
import { ProductListComponent } from '@funk/ui/web/app/shop/product/list.component'

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ProductListItemComponent,
    ProductListComponent,
  ],
})
export class ProductModule
{ }
