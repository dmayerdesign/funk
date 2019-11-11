import { Component, Input } from '@angular/core'
import { Product } from '@funk/model/commerce/product/product'

@Component({
  selector: 'product-list-item',
  template: `
    <div>
      <strong>{{ product?.title }}</strong>
    </div>
  `
})
export class ProductListItemComponent {
  @Input() public product?: Product
}
