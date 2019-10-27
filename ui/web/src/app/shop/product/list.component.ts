import { Component, Input } from '@angular/core'
import { Product } from '@funk/model/commerce/product/product'
import { CollectionSource } from '@funk/ui/helpers/angular.helpers'

@Component({
  selector: 'product-list',
  template: ``
})
export class ProductListComponent {
  @Input() public source?: CollectionSource<Product>
}

/*
FILTER

Property types
  string:                            eq | ne
  boolean:                           eq | ne
  number | Date:                     eq | ne | gt | gte | lt | lte
  Array (of primitives):             in | nin
*/
