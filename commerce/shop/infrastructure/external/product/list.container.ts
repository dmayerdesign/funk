import { Component, Inject } from "@angular/core"
import { MarshalledProduct } from "@funk/commerce/product/domain/product"
import { ListPublished } from "@funk/commerce/product/infrastructure/external/cloud-functions/list-published"
import getQueryConditions from "@funk/commerce/shop/application/external/products/list-filter/behaviors/get-query-conditions"
import { ListFilter } from "@funk/commerce/shop/application/external/products/list-filter/list-filter"
import { LIST_PUBLISHED } from "@funk/commerce/shop/infrastructure/external/product/tokens"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import {
  Pagination,
  TAKE_ALL,
  VirtualPagination,
} from "@funk/persistence/application/external/pagination"
import { LoadingController } from "@ionic/angular"
import { flatten } from "lodash"
import { BehaviorSubject, combineLatest, Observable } from "rxjs"
import { map, switchMap } from "rxjs/operators"

@Component({
  selector: "product-list-container",
  template: `
    <product-list
      [products]="products | async"
      [filters]="filters | async"
      [pagination]="pagination | async"
      (filtersChange)="handleFiltersChange($event)"
      (paginationChange)="handlePaginationChange($event)"
    >
    </product-list>
  `,
})
export class ProductListContainer {
  private _pagination = new BehaviorSubject<
    Pagination<MarshalledProduct> | VirtualPagination
  >({
    skip: 0,
    take: TAKE_ALL,
    orderBy: "updatedAt",
    orderByDirection: "desc",
  })
  private _filters = new BehaviorSubject<ListFilter[]>([])
  public pagination = this._pagination.asObservable()
  public filters: Observable<ListFilter[]> = this._filters.asObservable()
  public queryConditions = this.filters.pipe(
    map((filters) => flatten(filters.map(getQueryConditions))),
    shareReplayOnce(),
  )
  public products: Observable<MarshalledProduct[]> = combineLatest(
    this.queryConditions,
    this.pagination,
  ).pipe(
    switchMap(async ([conditions, pagination]) => {
      const loading = await this._loadingController.create({
        id: "PRODUCTS_LOADING",
      })
      loading.present()
      const products = await this._listPublished({ pagination, conditions })
      await this._loadingController.dismiss("PRODUCTS_LOADING")
      return products
    }),
    shareReplayOnce(),
  )

  public constructor(
    @Inject(LIST_PUBLISHED) private _listPublished: ListPublished,
    private _loadingController: LoadingController,
  ) {}

  public handleFiltersChange(filters: ListFilter[]): void {
    this._filters.next(filters)
  }

  public handlePaginationChange(
    pagination: Pagination<MarshalledProduct> | VirtualPagination,
  ): void {
    this._pagination.next(pagination)
  }
}
