import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ListFilter } from '@funk/model/commerce/product/list-filter'
import { Product } from '@funk/model/commerce/product/product'
import { Observable } from 'rxjs'

@Component({
  selector: 'product-list',
  template: `
    <ng-container *ngFor="let product of products | async">
      <product-list-item [product]="product"></product-list-item>
    </ng-container>
  `,
})
export class ProductListComponent
{
  @Input() public products!: Observable<Product>
  @Output() public filtersChange = new EventEmitter<ListFilter[]>()
  public products$?: Observable<Product[]>
  private _filters = new Map<string, ListFilter>()

  public addFilter(key: string, filter: ListFilter): void
  {
    this._filters.set(key, filter)
    this.filtersChange.emit(Array.from(this._filters.values()))
  }

  public removeFilter(key: string): void
  {
    this._filters.delete(key)
    this.filtersChange.emit(Array.from(this._filters.values()))
  }
}

/*
FILTER

Property types
  string:                            eq | ne
  boolean:                           eq | ne
  number | Date:                     eq | ne | gt | gte | lt | lte
  Array (of primitives):             in | nin
*/
