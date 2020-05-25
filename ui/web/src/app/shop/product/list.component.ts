import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core"
import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { ListFilter } from "@funk/model/commerce/product/list-filter/list-filter"
import { Product } from "@funk/model/commerce/product/product"
import { Pagination } from "@funk/ui/core/persistence/interface"
import { of, ReplaySubject } from "rxjs"
import { catchError, map, shareReplay } from "rxjs/operators"

@Component({
  selector: "product-list",
  template: `
    <ng-container *ngFor="let product of products">
      <product-list-item [product]="product"></product-list-item>
    </ng-container>

    <div *ngFor="let filter of (filtersForm | async)?.controls">
      <strong>Filter {{ filter?.value | json }}</strong>
      <ng-container [formGroup]="filter">
        <ion-input formControlName="type"></ion-input>
        <ion-input formControlName="value"></ion-input>
      </ng-container>
    </div>
  `,
})
export class ProductListComponent implements OnChanges
{
  @Input() public products!: Product[]
  @Input() public filters!: ListFilter[]
  @Input() public pagination!: Pagination
  @Output() public filtersChange = new EventEmitter<ListFilter[]>()
  @Output() public paginationChange = new EventEmitter<Pagination>()

  private _filters = new ReplaySubject<ListFilter[]>(1)
  public filtersForm = this._filters.pipe(
    map((filters) =>
      new FormArray(filters.map((filter) =>
        new FormGroup(
          Object.keys(filter).reduce(
            (groupDef, key) => ({
              ...groupDef,
              [key]: new FormControl(filter[key as keyof ListFilter]),
            }),
            {} as { [key: string]: FormControl }
          ))))),
    catchError(() => of(undefined)),
    shareReplay(1)
  )

  public ngOnChanges(changes: SimpleChanges): void
  {
    const INITIAL_FILTERS: keyof this = "filters"
    const filtersChange = changes[INITIAL_FILTERS as string]
    const filters: ListFilter[] | undefined = filtersChange.currentValue
    if (filters)
    {
      this._filters.next(filters)
    }
  }
}
