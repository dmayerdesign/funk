import { Component } from '@angular/core'
import { ListFilterType } from '@funk/model/commerce/product/list-filter'
import { timer } from 'rxjs'
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators'

@Component({
  selector: 'shop-home',
  template: `
    <h2>Shop Home works!</h2>
    <product-list
      [products]="[]"
      [initialFilters]="initialFilters | async"
      (filtersChange)="handleFiltersChange()">
    </product-list>
  `,
})
export class HomeContainer
{
  public initialFilters = timer(2000).pipe(
    map((n) => ([
      {
        type: n % 2
          ? ListFilterType.AttributeValue
          : ListFilterType.TaxonomyTerm,
      },
    ])),
    distinctUntilChanged(),
    shareReplay(1),
  )

  public handleFiltersChange(): void
  {
  }
}
