import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from '@funk/model/commerce/product/product'
import { ProductListFilter } from '@funk/model/commerce/product/product-list-filter'
import FirestoreCollectionSource from '@funk/ui/helpers/data-access/firestore-collection-source'
import { Observable } from 'rxjs'

@Component({
  selector: 'product-list',
  template: `
    <ng-container *ngFor="let product of products$ | async">
      <product-list-item [product]="product"></product-list-item>
    </ng-container>
  `
})
export class ProductListComponent implements OnInit {
  @Input() public source?: FirestoreCollectionSource<Product>
  @Output() public filtersChange = new EventEmitter<ProductListFilter[]>()
  public products$?: Observable<Product[]>
  private _filters = new Map<string, ProductListFilter>()

  public ngOnInit(): void {
    if (this.source) {
      this.products$ = this.source.connect()
    }
  }

  public addFilter(key: string, filter: ProductListFilter): void {
    this._filters.set(key, filter)
    this.filtersChange.emit(Array.from(this._filters.values()))
  }

  public removeFilter(key: string): void {
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
