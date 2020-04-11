import { Component, OnInit } from '@angular/core'
import { ListFilterType } from '@funk/model/commerce/product/list-filter'
import { timer } from 'rxjs'
import { distinctUntilChanged, map, share } from 'rxjs/operators'

@Component({
  selector: 'shop-home',
  template: `
    <h2>Shop Home works!</h2>
    <product-list *ngIf="initialFilterz"
      [products]="[]"
      [initialFilters]="initialFilterz">
    </product-list>
  `,
})
export class HomeContainer implements OnInit
{
  public initialFilters = timer(0, 2000).pipe(
    map((n) => ([
      {
        type: n % 2
          ? ListFilterType.AttributeValue
          // : n % 4
          // ? ListFilterType.Property
          // : n % 3
          // ? ListFilterType.SimpleAttributeValue
          : ListFilterType.TaxonomyTerm,
      },
    ])),
    distinctUntilChanged(),
    share(),
  )
  public initialFilterz!: any

  public ngOnInit(): void
  {
    this.initialFilters.subscribe(x =>
    {
      console.log('got a new value', this.initialFilterz === x)
      this.initialFilterz = x
    })
  }
}
