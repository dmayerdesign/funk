import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
  SimpleChange,
} from "@angular/core"
import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { ListFilter } from "@funk/ui/core/shop/products/list-filter/list-filter"
import { Product } from "@funk/model/commerce/product/product"
import { Pagination } from "@funk/ui/plugins/persistence/pagination"
import { catchError, map, shareReplay } from "rxjs/operators"
import { ReplaySubject, of } from "rxjs"

interface ProductListOptions {
  products: Product[]
  filters: ListFilter[]
  pagination: Pagination
}

@Component({
  selector: "product-list",
  template: `
    <ion-grid>
      <ng-container *ngFor="let product of products">
        <ion-row><ion-col>
          <product-list-item [product]="product"></product-list-item>
        </ion-col></ion-row>
      </ng-container>

      <div *ngFor="let filter of (filtersForm | async)?.controls">
        <strong>Filter {{ filter?.value | json }}</strong>
        <ng-container [formGroup]="filter">
          <ion-input formControlName="type"></ion-input>
          <ion-input formControlName="value"></ion-input>
        </ng-container>
      </div>
    </ion-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnChanges, ProductListOptions
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
    const INITIAL_FILTERS: keyof ProductListOptions = "filters"
    const filtersChange = changes[INITIAL_FILTERS as string] as SimpleChange | undefined
    const filters: ListFilter[] | undefined = filtersChange?.currentValue

    if (filters)
    {
      this._filters.next(filters)
    }
  }
}