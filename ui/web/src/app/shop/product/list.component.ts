import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'
import { ListFilter } from '@funk/model/commerce/product/list-filter'
import { Product } from '@funk/model/commerce/product/product'
import MortalityAware from '@funk/ui/helpers/mortality-aware'
import ReactiveInputs from '@funk/ui/helpers/reactive-inputs'
import { defer, Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'

@ReactiveInputs<ProductListComponent>([[ 'initialFilters', 'filters' ]])
@MortalityAware()
@Component({
  selector: 'product-list',
  template: `
    <ng-container *ngFor="let product of products | async">
      <product-list-item [product]="product"></product-list-item>
    </ng-container>

    <div *ngFor="let filter of (filtersForm | async).controls">
      <strong>Filter {{ filter?.value | json }}</strong>
      <ng-container [formGroup]="filter">
        <ion-input formControlName="type"></ion-input>
        <ion-input formControlName="value"></ion-input>
      </ng-container>
    </div>
  `,
})
export class ProductListComponent implements OnChanges, OnDestroy
{
  @Input() public products!: Product[]
  @Input() public initialFilters!: ListFilter[]
  @Output() public filtersChange = new EventEmitter<ListFilter[]>()

  public filters!: Observable<ListFilter[]>
  public filtersForm = defer(() => this.filters).pipe(
    map((filters) =>
      new FormArray(filters.map((filter) =>
        new FormGroup(
          Object.keys(filter).reduce(
            (groupDef, key) => ({
              ...groupDef,
              [key]: new FormControl(filter[key as keyof ListFilter]),
            }),
            {} as { [key: string]: FormControl },
          ))))),
    shareReplay(1),
  )

  public ngOnChanges(): void { }
  public ngOnDestroy(): void { }
}
