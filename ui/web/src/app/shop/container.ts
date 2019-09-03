import { Component, NgZone, OnInit } from '@angular/core'
import { setUpDevTools, Manager } from '@dannymayer/vex'
import { mapResultToState, CollectionSource } from '@funk/ui/helpers/ui-component.helpers'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Api } from './api'
import { HEIGHT_PX } from './config'
import { ShopAction, ShopState } from './model'

@Component({
  template: `
    <nav class="mat-elevation-z10">
      <button mat-button [matMenuTriggerFor]="menu">Menu</button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>Item 1</button>
        <button mat-menu-item>Item 2</button>
      </mat-menu>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav button {
      padding-top: ${HEIGHT_PX / 3}px;
      padding-bottom: ${HEIGHT_PX / 3}px;
      line-height: ${HEIGHT_PX / 3}px;
      overflow: visible;
      white-space: normal;
    }
  `],
})
export class ShopContainer implements OnInit {
  public productsSource = new CollectionSource(this._manager
    .results(ShopAction.GET_PRODUCTS)
    .pipe(
      mapResultToState('cart'),
      map(({ products }) => products),
    ))

  constructor(
    private _ngZone: NgZone,
    private _manager: Manager<ShopState>,
    public api: Api,
  ) { }

  public ngOnInit(): void {
    if (!environment.production) {
      this._ngZone.run(() => setUpDevTools())
    }

    this.api.initShop()
    this.api.initCart()
  }
}
