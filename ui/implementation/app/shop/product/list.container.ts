import { Component } from "@angular/core"
import listPublished from "@funk/api/commerce/product/list-published"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import getQueryConditions from
  "@funk/model/commerce/product/list-filter/actions/get-query-conditions"
import { ListFilter } from "@funk/model/commerce/product/list-filter/list-filter"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Pagination, TAKE_ALL, VirtualPagination } from "@funk/plugins/persistence/pagination"
import { FunctionsClient } from "@funk/ui/helpers/functions-client"
import { flatten } from "lodash"
import { BehaviorSubject, Observable, combineLatest } from "rxjs"
import { map, switchMap } from "rxjs/operators"

@Component({
  selector: "product-list-container",
  template: `
    <product-list
      [products]="products | async"
      [filters]="filters | async"
      [pagination]="pagination | async"
      (filtersChange)="handleFiltersChange($event)"
      (paginationChange)="handlePaginationChange($event)">
    </product-list>
  `,
})
export class ProductListContainer
{
  private _pagination = new BehaviorSubject<Pagination<MarshalledProduct> | VirtualPagination>({
    skip: 0,
    take: TAKE_ALL,
    orderBy: "updatedAt",
    orderByDirection: "desc",
  })
  private _filters = new BehaviorSubject<ListFilter[]>([])
  public pagination = this._pagination.asObservable()
  public filters: Observable<ListFilter[]> = this._filters
    .pipe(
      shareReplayOnce()
    )
  public queryConditions = this.filters.pipe(
    map((filters) => flatten(filters.map(getQueryConditions))),
    shareReplayOnce()
  )
  public products: Observable<MarshalledProduct[]> = combineLatest(
    this.queryConditions,
    this.pagination)
    .pipe(
      switchMap(([ conditions, pagination ]) =>
        this._functionsClient.rpc<typeof listPublished>(
          "commerceProductListPublished",
          { pagination, conditions })),
      shareReplayOnce()
    )

  public constructor(
    private _functionsClient: FunctionsClient
  )
  { }

  public handleFiltersChange(filters: ListFilter[]): void
  {
    this._filters.next(filters)
  }
  public handlePaginationChange(
    pagination: Pagination<MarshalledProduct> | VirtualPagination
  ): void
  {
    this._pagination.next(pagination)
  }
}
