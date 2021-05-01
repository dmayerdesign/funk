import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core"
import { FormArray, FormControl, FormGroup } from "@angular/forms"
import { Product } from "@funk/commerce/product/model/product"
import { ListFilter } from "@funk/commerce/shop/application/external/products/list-filter/list-filter"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"
import { Observable, of, ReplaySubject } from "rxjs"
import { catchError, map } from "rxjs/operators"

interface ProductListOptions {
  products: Product[]
  filters: ListFilter[]
  pagination: Pagination<Product> | VirtualPagination
}

@Component({
  selector: "product-list",
  template: `
    <ion-grid class="grid">
      <ng-container *ngFor="let product of products">
        <ion-row class="row">
          <ion-col class="col">
            <product-list-item [product]="product"></product-list-item>
          </ion-col>
        </ion-row>
      </ng-container>

      <div *ngFor="let filter of filterFormGroups | async">
        <strong>Filter {{ filter?.value | json }}</strong>
        <ng-container [formGroup]="filter">
          <ion-input class="input" formControlName="type"></ion-input>
          <ion-input class="input" formControlName="value"></ion-input>
        </ng-container>
      </div>
    </ion-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnChanges, ProductListOptions {
  @Input() public products!: Product[]
  @Input() public filters!: ListFilter[]
  @Input() public pagination!: Pagination<Product> | VirtualPagination
  @Output() public filtersChange = new EventEmitter<ListFilter[]>()
  @Output() public paginationChange = new EventEmitter<Pagination>()

  private _filters = new ReplaySubject<ListFilter[]>(1)
  public maybeFiltersForm = this._filters.pipe(
    map(
      (filters) =>
        new FormArray(
          filters.map(
            (filter) =>
              new FormGroup(
                Object.keys(filter).reduce(
                  (groupDef, key) => ({
                    ...groupDef,
                    [key]: new FormControl(filter[key as keyof ListFilter]),
                  }),
                  {} as { [key: string]: FormControl },
                ),
              ),
          ),
        ),
    ),
    catchError(() => of(undefined)),
    shareReplayOnce(),
  )
  public filterFormGroups: Observable<FormGroup[]> = this.maybeFiltersForm.pipe(
    map(
      (maybeFiltersForm) => (maybeFiltersForm?.controls as FormGroup[]) ?? [],
    ),
    shareReplayOnce(),
  )

  public ngOnChanges(changes: SimpleChanges): void {
    const INITIAL_FILTERS: keyof ProductListOptions = "filters"
    const filtersChange = changes[INITIAL_FILTERS as string] as
      | SimpleChange
      | undefined
    const filters: ListFilter[] | undefined = filtersChange?.currentValue

    if (filters) {
      this._filters.next(filters)
    }
  }
}
