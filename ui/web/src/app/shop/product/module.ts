import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProductListItemComponent } from './list-item.component'
import { ProductListComponent } from './list.component'

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ProductListItemComponent,
    ProductListComponent,
  ],
})
export class ProductModule { }
